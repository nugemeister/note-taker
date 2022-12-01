const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express ();

// setting up port
const PORT = process.env.PORT || 3001;

// stored sample notes variable
var storedNotes = require('./db/db.json');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// reference static public folder
app.use(express.static('public'));


// Routes Section

// bad request response
app.use((req, res) => {
    res.sendStatus(404).end();
});

// homepage ('/') GET
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

// '/notes' GET
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// GET saved sample notes
app.get('/api/notes', (req, res) => {
    res.json(storedNotes);
});

// POST for adding notes
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} new note added!`);

    const {title, text} = req.body
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        };

        storedNotes.push(newNote);

        fs.writeFile(`./db/db.json`, JSON.stringify(storedNotes, null, 2), (err) =>
        err
            ? console.error(err)
            : console.log(
                `Your new note "${newNote.title}" has been saved to the json!`
            )
        );

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('There has been an error in attempting to save your note, please retry.');
    }
});


// listen for server request
app.listen(PORT, () => {
    console.log(`Application is listening on port ${PORT}`);
});

const express = require('express');
const apiRoutes = require('./routes/');
const path = require('path');

const app = express ();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// api routes
app.use('/api', apiRoutes);

// reference static public folder
app.use(express.static('public'));

// reference default index.html
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'/public/index.html'));
});

// reference notes page
app.get('/notes',(req,res) => {
    res.sendFile(path.join(__dirname,'/public/notes.html'));
});

// listen for server request
app.listen(PORT, () => {
    console.log(`Application is listening on port ${PORT}`);
});

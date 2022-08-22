// const section
const express = require('express');
const db = require('../db/db.json');
const fs = require('fs');
const notesRoute = express.Router();
const {v1: uuidv1} = require('uuid');

// GET
notesRoute.get('/', (req, res) => {
    res.json(db);
});

// POST
notesRoute.get('/', (req, res) => {
    const{title, text} = req.body;

    if (title && text){
        const newNote = {
            title,
            text,
            id: uuidv1()
        }

        db.push(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(db, null, 1), error => {
            if(error){
                console.error(error);
                res.status(500).json('Error saving note, please resubmit.');
            } else {
                console.log('Your note has been added.');

                const response = {
                    status: 200,
                    statusText: 'Successfully added your note!',
                    ok: true,
                    body: newNote
                };

                res.json(response);
            }
        });
    } else {
        res.status(400).json('Unable to save your note, please check your entry.');
    }
});

module.exports = notesRoute
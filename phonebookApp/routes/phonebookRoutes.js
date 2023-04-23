
const express = require('express');
const router = express.Router();
const phonebook = require('../model/phonebook');
router.route('/')
    .get((req, res) => {

        res.json(phonebook);

    })
    .post((req, res) => {
        if (!req.body.name || !req.body.number) res.status(400).json({ "error": "name or number is missing." });

        const newId = phonebook.length + 1;

        const newPhonebook = {
            id: newId,
            name: req.body.name,
            number: req.body.number
        };

        phonebook.push(newPhonebook);
        res.status(201).json({ "message": "New phonbook is created successfully" });

    })
    .put((req, res) => {
        res.status(405).json({ "error": "PUT method is not allowed." });
    })
    .delete((req, res) => {
        res.status(405).json({ "error": "DELETE method is not allowed." });
    });

router.route('/:phonebookId')
    .get((req, res) => {
        if (!req.params.phonebookId) res.status(400).json({ "error": "id is missing" });

        const phoneBookID = Number(req.params.phonebookId);
        if (phoneBookID > phonebook.length) res.status(400).json({ "error": "id is not found" });
        phonebook.find(book => {
            if (book.id === phoneBookID) res.json(book);
        })
        res.status(400).json({ "error": "id is not found" });


    })
    .post((req, res) => res.status(405).json({ "error": "POST method is not allowed." }))
    .put((req, res) => {
        if (!req.params.phonebookId) res.status(400).json({ "error": "id is missing" });
        if (!req.body.name && !req.body.number) res.status(400).json({ "error": "name and number are missing." });
        const phoneBookID = Number(req.params.phonebookId);
        if (phoneBookID > phonebook.length) res.status(400).json({ "error": "id is not found" });
        const updatedPhonebook = phonebook.find(book => {
            if (book.id === phoneBookID) {
                book.name = req.body.name || book.name,
                    book.number = req.body.number || book.number
                res.status(201).json({ "message": "Updated successfully" });

            }
            //return book;
        });
        res.status(400).json({ "error": "id is not found" });

    })
    .delete((req, res) => {
        const phoneBookID = Number(req.params.phonebookId);
        if (phoneBookID > phonebook.length) res.status(400).json({ "error": "id is not found" });
        const updatedPhonebook = phonebook.filter(phonebookDetail => {
            if (phonebookDetail.id != req.params.phonebookId) return phonebookDetail;

        });
        // phonebook = updatedPhonebook;
        res.status(201).json(updatedPhonebook);



    })
module.exports = router;
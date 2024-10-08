const db = require('../model/index');
const sequelize = db.sequelize;
const master = db.master;
const { validationResult } = require('express-validator');
const { where } = require('sequelize');

module.exports = {

    // Fetch all records from the 'master' table
    getAllmaster: (req, res) => {
        // sequelize.query('SELECT * FROM master')
        db.master.findAll({include:{all:true,nested:false}}).then(data => {

            // Send the data if records are found
            res.status(200).send({ error: false, data: data });
        })
            .catch(err => {
                // Log and send the error
                console.error('Error fetching master records:', err);
                res.status(500).send({ error: true, message: err.message });
            });
    },
    getAllmasterById: (req, res) => {
        const id = req.params.id;

        db.master.findAll({ where: { id: id } }).then(data => {
            // Check if any data is returned

            // Send the data if records are found
            res.status(200).send({ error: false, data: data });
        })
            .catch(err => {
                // Log and send the error
                console.error('Error fetching master records:', err);
                res.status(500).send({ error: true, message: err.message });
            });
    },

    // Add a new record to the 'master' table
    addmaster: (req, res) => {
        const errors = validationResult(req);

        // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).send({ error: true, errors: errors.array() });
        } else {

            const { Name, description } = req.body;
            let image;

            // Single if-else block to handle image assignment
            if (req.file) {
                image = req.file.filename; // If a file is uploaded, use its filename
            } else {
                image = 'default.jpg'; // If no file is uploaded, use the default image
            }

            // Insert the data into the 'master' table
            // sequelize.query(
            //     `INSERT INTO master (id, Name, description, image) VALUES (0, ?, ?, ?)`,
            //     {
            //         replacements: [Name, description, image],
            //     }
            // )
            db.master.create({ Name: Name, description: description, image: image }).then(result => {
                res.status(201).send({ message: 'main master added successfully!', result });
            }).catch(error => {
                console.error('Error adding master:', error);
                res.status(500).send({ error: 'An error occurred while adding the master.' });
            });
        }
    },

    updatemaster: (req, res) => {

        const errors = validationResult(req);

        // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).send({ error: true, errors: errors.array() });
        }else{
        const id = req.params.id;
        const { Name,  description } = req.body;

        db.master.update({ Name: Name,  description: description}, { where: { id: id } }).then(data => {
            // Check if any data is returned

            // Send the data if records are found
            res.status(200).send({ error: false, data: data });
        })
            .catch(err => {
                // Log and send the error
                console.error('Error fetching master records:', err);
                res.status(500).send({ error: true, message: err.message });
            });
        }
    },

    deletemaster: (req, res) => {
        const id = req.params.id;
        const { status } = req.body;
    
        db.master.destroy({
            where: {
                id: id,
                status: status
            }
        }).then(rowsAffected => {
            if (rowsAffected > 0) {
                res.status(200).send({ error: false, message: 'Record deleted successfully' });
            } else {
                res.status(404).send({ error: true, message: 'Record not found' });
            }
        })
        .catch(err => {
            console.error('Error deleting master records:', err);
            res.status(500).send({ error: true, message: err.message });
        });
    }
    
};

const db = require('../model/index');
const sequelize = db.sequelize;
const size = db.size;
const { validationResult } = require('express-validator');
const { where } = require('sequelize');

module.exports = {

    // Fetch all records from the 'size' table
    getAllsize: (req, res) => {
        // sequelize.query('SELECT * FROM size')
        db.size.findAll({ include: { all: true, nested: false } }).then(data => {

            // Send the data if records are found
            res.status(200).send({ error: false, data: data });
        })
            .catch(err => {
                // Log and send the error
                console.error('Error fetching size records:', err);
                res.status(500).send({ error: true, message: err.message });
            });
    },
    
    getAllsizeById: (req, res) => {
        const id = req.params.id;

        db.size.findAll({ where: { id: id } }).then(data => {
            // Check if any data is returned

            // Send the data if records are found
            res.status(200).send({ error: false, data: data });
        })
            .catch(err => {
                // Log and send the error
                console.error('Error fetching size records:', err);
                res.status(500).send({ error: true, message: err.message });
            });
    },

    // Add a new record to the 'size' table
    addSizes: (req, res) => {
        const errors = validationResult(req);
    
        // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).send({ error: true, errors: errors.array() });
        } else {
            // Capture the array of sizes from the request body
            const sizesArray = JSON.stringify(req.body.size)
            let prod_id=req.body.prod_id
            let data={
                size:sizesArray, prod_id:prod_id
            }
    
            // Use Sequelize's bulkCreate method to add multiple entries at once
            db.size.create(data)
                .then(result => {
                    res.status(201).send({ message: 'Sizes added successfully!', result });
                })
                .catch(error => {
                    console.error('Error adding sizes:', error);
                    res.status(500).send({ error: 'An error occurred while adding the sizes.' });
                });
        }
    },
    
    updateSizes: (req, res) => {
        const errors = validationResult(req);
    
        // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).send({ error: true, errors: errors.array() });
        } else {
            const sizesArray = req.body; // Array of size objects to update
    
            // Iterate through each object and update based on ID or unique field
            Promise.all(sizesArray.map(sizeObj => {
                return db.size.update(
                    { chest: sizeObj.chest, waist: sizeObj.waist, shoulder: sizeObj.shoulder, length: sizeObj.length },
                    { where: { id: sizeObj.id } }
                );
            }))
            .then(result => {
                res.status(200).send({ message: 'Sizes updated successfully!', result });
            })
            .catch(error => {
                console.error('Error updating sizes:', error);
                res.status(500).send({ error: 'An error occurred while updating the sizes.' });
            });
        }
    },
    

    deleteSizes: (req, res) => {
        const idsArray = req.body.ids; // Array of IDs to be deleted
    
        db.size.destroy({
            where: {
                id: idsArray
            }
        })
        .then(rowsDeleted => {
            res.status(200).send({ message: `${rowsDeleted} size records deleted successfully` });
        })
        .catch(error => {
            console.error('Error deleting size records:', error);
            res.status(500).send({ error: 'An error occurred while deleting the sizes.' });
        });
    }
    

};

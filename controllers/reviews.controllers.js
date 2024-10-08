const db = require('../model/index');
const sequelize = db.sequelize;
const reviews = db.reviews;
const { validationResult } = require('express-validator');


module.exports = {

    // Fetch all records from the 'reviews' table
    getAllreviews: (req, res) => {
        // sequelize.query('SELECT * FROM reviews')
        db.reviews.findAll({include:{all:true,nested:false}}).then(data => {

            // Send the data if records are found
            res.status(200).send({ error: false, data: data });
        })
            .catch(err => {
                // Log and send the error
                console.error('Error fetching reviews records:', err);
                res.status(500).send({ error: true, message: err.message });
            });
    },
    getAllreviewsById: (req, res) => {
        const id = req.params.id;

        db.reviews.findAll({ where: { id: id } }).then(data => {
            // Check if any data is returned

            // Send the data if records are found
            res.status(200).send({ error: false, data: data });
        })
            .catch(err => {
                // Log and send the error
                console.error('Error fetching reviews records:', err);
                res.status(500).send({ error: true, message: err.message });
            });
    },

    // Add a new record to the 'reviews' table
    addreviews: (req, res) => {
        const errors = validationResult(req);

        // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).send({ error: true, errors: errors.array() });
        } else {

            const { reviews,rating, prod_id } = req.body;
            let image;
            // Single if-else block to handle image assignment
            if (req.files) {
                image = req.files.filename; // If a file is uploaded, use its filename
            } else {
                image = 'default.jpg'; // If no file is uploaded, use the default image
            }
            
            db.reviews.create({ reviews:reviews, rating:rating, image:image, prod_id:prod_id }).then(result => {
                res.status(201).send({ message: 'main reviews added successfully!', result });
            }).catch(error => {
                console.error('Error adding reviews:', error);
                res.status(500).send({ error: 'An error occurred while adding the reviews.' });
            });
        }
    },

    updatereviews: (req, res) => {

        const errors = validationResult(req);

        // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).send({ error: true, errors: errors.array() });
        }else{
        const id = req.params.id;
        const { reviews,   rating } = req.body;

        db.reviews.update({ reviews:reviews,  rating:rating}, { where: { id: id } }).then(data => {
            // Check if any data is returned

            // Send the data if records are found
            res.status(200).send({ error: false, data: data });
        })
            .catch(err => {
                // Log and send the error
                console.error('Error fetching reviews records:', err);
                res.status(500).send({ error: true, message: err.message });
            });
        }
    },

    deletereviews: (req, res) => {
        const id = req.params.id;
        const { status } = req.body;
    
        db.reviews.destroy({
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
            console.error('Error deleting reviews records:', err);
            res.status(500).send({ error: true, message: err.message });
        });
    }
    
};

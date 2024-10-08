const { injectReplacements } = require('sequelize/lib/utils/sql');
const db = require('../model/index');
const sequelize = db.sequelize;

const { validationResult } = require('express-validator');

module.exports = {

    // Fetch all records from the 'master' table
    getAll: (req, res) => {
        // sequelize.query('SELECT * FROM subCat')
         db.color.findAll({}).then(data => {

            // Send the data if records are found
            res.status(200).send({ error: false, data: data[0] });
        })
        .catch(err => {
            // Log and send the error
            console.error('Error fetching Color records:', err);
            res.status(500).send({ error: true, message: err.message });
        });
    },

    getAllById: (req, res) => {
        const id = req.params.id;

        db.color.findAll({ where: { id: id } }).then(data => {
            // Check if any data is returned

            // Send the data if records are found
            res.status(200).send({ error: false, data: data });
        })
            .catch(err => {
                // Log and send the error
                console.error('Error fetching Color records:', err);
                res.status(500).send({ error: true, message: err.message });
            });
    },
    

    // Add a new record to the 'master' table
    addcolor: (req, res) => {
        const errors = validationResult(req);

        // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).send({ error: true, errors: errors.array() });
        }

        const { Name, prod_id } = req.body; // Include master_id in the request
        let image;

        // Single if-else block to handle image assignment
        if (req.files) {
            image = req.files[0].filename; // If a file is uploaded, use its filename
        } else {
            image = 'default.jpg'; // If no file is uploaded, use the default image
        }
        
        db.color.create({ Name:Name, prod_id:prod_id ,image:image }).then(result => {
           
        console.log(result);
        console.log(req.files);

        req.files.map((img)=>{
            db.colorimage.create({image:img.filename, color_id:result.id})
        })
        res.status(201).send({ message: 'Color data added successfully with colorimages', result });

            
        }).catch(error => {
            console.error('Error adding Color:', error);
            res.status(500).send({ error: 'An error occurred while adding the Color.' });
        });
    },


    // Update 'menu' record, including the foreign key
    updatecolor: (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send({ error: true, errors: errors.array() });
        }
        const id=req.params.id;
        const { Name, cat_id } = req.body;

        if (!id) {
            return res.status(400).send({ error: true, message: 'ID is required for updating the record.' });
        }

       
        db.color.update({Name:Name, cat_id:cat_id}, {where:{id:id}}).then(result => {
            if (result.affectedRows > 0) {
                return res.status(404).send({ error: true, message: 'No Color record found with the provided ID.' });
            }
            res.status(200).send({ message: 'Color data updated successfully!', result });
        }).catch(error => {
            console.error('Error updating Color:', error);
            res.status(500).send({ error: 'An error occurred while updating the Color.' });
        });
    },

    deletecolor: (req, res) => {
        const id = req.params.id;
        const { status } = req.body;
    
        db.color.destroy({
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
            console.error('Error deleting Color records:', err);
            res.status(500).send({ error: true, message: err.message });
        });
    }

};

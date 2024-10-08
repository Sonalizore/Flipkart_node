const { injectReplacements } = require('sequelize/lib/utils/sql');
const db = require('../model/index');
const sequelize = db.sequelize;
const { validationResult } = require('express-validator');

module.exports = {

    // Fetch all records from the 'master' table
    getAllsubcat: (req, res) => {
        // sequelize.query('SELECT * FROM subCat')
         db.subcat.findAll({}).then(data => {

            // Send the data if records are found
            res.status(200).send({ error: false, data: data[0] });
        })
        .catch(err => {
            // Log and send the error
            console.error('Error fetching subcategory records:', err);
            res.status(500).send({ error: true, message: err.message });
        });
    },

    getAllsubcatById: (req, res) => {
        const id = req.params.id;

        db.subcat.findAll({ where: { id: id } }).then(data => {
            // Check if any data is returned

            // Send the data if records are found
            res.status(200).send({ error: false, data: data });
        })
            .catch(err => {
                // Log and send the error
                console.error('Error fetching subcategory records:', err);
                res.status(500).send({ error: true, message: err.message });
            });
    },
    

    // Add a new record to the 'master' table
    addsubcat: (req, res) => {
        const errors = validationResult(req);

        // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).send({ error: true, errors: errors.array() });
        }

        const { Name, cat_id } = req.body; // Include master_id in the request

        if (!cat_id) {
            return res.status(400).send({ error: true, message: 'cat_id is required.' });
        }

        // sequelize.query(`INSERT INTO menu (id, Name, cat_id) VALUES (0, ?, ?)`,
        //     {
        //         replacements: [Name, cat_id],
        //     }
        // )
        db.subcat.create({ Name:Name, cat_id:cat_id }).then(result => {
            res.status(201).send({ message: 'subcategory data added successfully!', result });
            
        }).catch(error => {
            console.error('Error adding subcategory:', error);
            res.status(500).send({ error: 'An error occurred while adding the subcategory.' });
        });
    },


    // Update 'menu' record, including the foreign key
    updatesubcat: (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send({ error: true, errors: errors.array() });
        }
        const id=req.params.id;
        const { Name, cat_id } = req.body;

        if (!id) {
            return res.status(400).send({ error: true, message: 'ID is required for updating the record.' });
        }

       
        db.subcat.update({Name:Name, cat_id:cat_id}, {where:{id:id}}).then(result => {
            if (result.affectedRows > 0) {
                return res.status(404).send({ error: true, message: 'No subcategory record found with the provided ID.' });
            }
            res.status(200).send({ message: 'subcategory data updated successfully!', result });
        }).catch(error => {
            console.error('Error updating subcategory:', error);
            res.status(500).send({ error: 'An error occurred while updating the subcategory.' });
        });
    },

    deletesubcat: (req, res) => {
        const id = req.params.id;
        const { status } = req.body;
    
        db.subcat.destroy({
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
            console.error('Error deleting subcategory records:', err);
            res.status(500).send({ error: true, message: err.message });
        });
    }

};

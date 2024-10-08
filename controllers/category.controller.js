const { injectReplacements } = require('sequelize/lib/utils/sql');
const db = require('../model/index');
// db.category.sync({ force: true })
//     .then(() => {
//         console.log('category table has been recreated.');
//     })
//     .catch(error => {
//         console.error('Error recreating menu table:', error);
//     });

const sequelize = db.sequelize;
const { validationResult } = require('express-validator');
const { where } = require('sequelize');

module.exports = {

    // Fetch all records from the 'master' table
    getAllcategory: (req, res) => {
        // sequelize.query('SELECT * FROM category')
        db.category.findAll({}).then(data => {
            // Send the data if records are found
            res.status(200).send({ error: false, data: data});
        })
        .catch(err => {
            // Log and send the error
            console.error('Error fetching category records:', err);
            res.status(500).send({ error: true, message: err.message });
        });
    },


    getAllcategoryById: (req, res) => {
        const id = req.params.id;

        db.master.findAll({ where: { id: id } }).then(data => {
            // Check if any data is returned

            // Send the data if records are found
            res.status(200).send({ error: false, data: data });
        })
            .catch(err => {
                // Log and send the error
                console.error('Error fetching category records:', err);
                res.status(500).send({ error: true, message: err.message });
            });
    },


    // Add a new record to the 'master' table
    addcategory: (req, res) => {
        const errors = validationResult(req);

        // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).send({ error: true, errors: errors.array() });
        }else{

        const { Name , menu_id} = req.body;

        // if (!menu_id) {
        //     return res.status(400).send({ error: true, message: 'menu_id is required.' });
        // }
       
        // Single if-else block to handle image assignment
        // If a file is uploaded, use its filename

        // Insert the data into the 'master' table
      
        // sequelize.query(
        //     `INSERT INTO category (id, Name) VALUES (0, ?)`,
        //     {
        //         replacements: [Name],
        //     }
        // )
        db.category.create({Name:Name, menu_id:menu_id}).then(result => {
            res.status(201).send({ message: 'category data added successfully!', result });
        }).catch(error => {
            console.error('Error adding category:', error);
            res.status(500).send({ error: 'An error occurred while adding the category.' });
        });
    }
    },

    updatecategory:(req,res)=>{
        const errors = validationResult(req);

        // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).send({ error: true, errors: errors.array() });
        }
        const id=req.params.id
        const { Name } = req.body;


        db.category.update({Name:Name,menu_id:menu_id},{where: {id:id} }).then(data=>{
            res.status(200).send({ error: false, data: data });
        }).catch(error => {
            console.error('Error updating category:', error);
            res.status(500).send({ error: 'An error occurred while updating the category.' });
        });

    },


    deletecategory: (req, res) => {
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
            console.error('Error deleting category records:', err);
            res.status(500).send({ error: true, message: err.message });
        });
    }

};

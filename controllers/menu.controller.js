const db = require('../model/index');
// // Sync only the 'menu' table and force its recreation
// db.menu.sync({ force: true })
//     .then(() => {
//         console.log('Menu table has been recreated.');
//     })
//     .catch(error => {
//         console.error('Error recreating menu table:', error);
//     });
const sequelize = db.sequelize;
const menu=db.menu;
const { validationResult } = require('express-validator');

module.exports = {

    // Fetch all records from the 'menu' table
    getAllmenu: (req, res) => {
        db.menu.findAll({})
            .then(data => {

                // Send the data if records are found
                res.status(200).send({ error: false, data: data });
            })
            .catch(err => {
                // Log and send the error
                console.error('Error fetching menu records:', err);
                res.status(500).send({ error: true, message: err.message });
            });
    },

    getAllmenuById: (req, res) => {
        const id = req.params.id;

        db.menu.findAll({ where: { id: id } }).then(data => {
            // Check if any data is returned

            // Send the data if records are found
            res.status(200).send({ error: false, data: data });
        })
            .catch(err => {
                // Log and send the error
                console.error('Error fetching menu records:', err);
                res.status(500).send({ error: true, message: err.message });
            });
    },


    // Add a new record to the 'master' table
    // Add a new record to the 'menu' table with a foreign key to 'master'
    addmenu: (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send({ error: true, errors: errors.array() });
        }

        const { Name, master_id } = req.body; // Include master_id in the request

        if (!master_id) {
            return res.status(400).send({ error: true, message: 'master_id is required.' });
        }

        // sequelize.query(`INSERT INTO menu (id, Name, master_id) VALUES (0, ?, ?)`,
        //     {
        //         replacements: [Name, master_id],
        //     }
        // )

        db.menu.create({ Name:Name, master_id:master_id }).then(result => {
            res.status(201).send({ message: 'Menu data added successfully!', result });
            
        }).catch(error => {
            console.error('Error adding menu:', error);
            res.status(500).send({ error: 'An error occurred while adding the menu.' });
        });
    },

    // Update 'menu' record, including the foreign key
     updatemenu: (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send({ error: true, errors: errors.array() });
        }
        const id=req.params.id;
        const { Name, master_id } = req.body;

        if (!id) {
            return res.status(400).send({ error: true, message: 'ID is required for updating the record.' });
        }

       
        db.menu.update({Name:Name, master_id:master_id}, {where:{id:id}}).then(result => {
            if (result.affectedRows > 0) {
                return res.status(404).send({ error: true, message: 'No menu record found with the provided ID.' });
            }
            res.status(200).send({ message: 'Menu data updated successfully!', result });
        }).catch(error => {
            console.error('Error updating menu:', error);
            res.status(500).send({ error: 'An error occurred while updating the menu.' });
        });
    },

    deletemenu: (req, res) => {
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
            console.error('Error deleting menu records:', err);
            res.status(500).send({ error: true, message: err.message });
        });
    }

};

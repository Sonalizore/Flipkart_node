const { injectReplacements } = require('sequelize/lib/utils/sql');
const db = require('../model/index');
const sequelize = db.sequelize;
const { validationResult } = require('express-validator');
const { Model } = require('sequelize');

module.exports = {

    // Fetch all records from the 'master' table
    getAllproduct: (req, res) => {
        // db.product.findAll({include:[{model:db.subcat, include:[{model:db.category,include:db.menu}]}]})
        db.product.findAll({include:{all:true}}) .then(data => {

            // Send the data if records are found
            res.status(200).send({ error: false, data: data[0] });
        })
        .catch(err => {
            // Log and send the error
            console.error('Error fetching product records:', err);
            res.status(500).send({ error: true, message: err.message });
        });
    },
    
    getAllproductById: (req, res) => {
        const id = req.params.id;

        db.product.findAll({ where: { id: id } }).then(data => {
            // Check if any data is returned

            // Send the data if records are found
            res.status(200).send({ error: false, data: data });
        })
            .catch(err => {
                // Log and send the error
                console.error('Error fetching product records:', err);
                res.status(500).send({ error: true, message: err.message });
            });
    },

    // Add a new record to the 'master' table
    addproduct: (req, res) => {
        const errors = validationResult(req);

        // Check for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).send({ error: true, errors: errors.array() });
        }

        const { Name, description, brand,price, productDetail,extraDetail,specification,subcat_id,discount} = req.body;
        let proImage;

        // Single if-else block to handle image assignment
        if (req.file) {
            proImage = req.file.filename; // If a file is uploaded, use its filename
        } else {
            proImage = 'default.jpg'; // If no file is uploaded, use the default image
        }

        // Insert the data into the 'master' table
        // sequelize.query(
        //     `INSERT INTO product (id, Name, description, proImage, brand,price, productDetail,extraDetail,specification) VALUES (0, ?, ?, ?,?,?,?,?,?)`,
        //     {
        //         replacements: [Name, description, proImage, brand,price, productDetail,extraDetail,specification],
        //     }
        // )
        db.product.create({Name:Name, description:description, proImage:proImage, brand:brand,discount:discount, price:price, productDetail:productDetail, extraDetail:extraDetail,specification:specification,subcat_id:subcat_id}).then(result => {
            res.status(201).send({ message: 'product added successfully!', result });
        }).catch(error => {
            console.error('Error adding product:', error);
            res.status(500).send({ error: 'An error occurred while adding the product.' });
        });
    },

    // Update 'menu' record, including the foreign key
    updateproduct: (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send({ error: true, errors: errors.array() });
        }
        const id=req.params.id;
        const { Name, subcat_id} = req.body;

        if (!id) {
            return res.status(400).send({ error: true, message: 'ID is required for updating the record.' });
        }

       
        db.product.update({Name:Name, description:description, proImage:proImage, brand:brand, price:price, productDetail:productDetail, extraDetail:extraDetail,specification:specification,subcat_id:subcat_id}, {where:{id:id}}).then(result => {
            if (result.affectedRows > 0) {
                return res.status(404).send({ error: true, message: 'No product record found with the provided ID.' });
            }
            res.status(200).send({ message: 'product data updated successfully!', result });
        }).catch(error => {
            console.error('Error updating product:', error);
            res.status(500).send({ error: 'An error occurred while updating the product.' });
        });
    },

    deleteproduct: (req, res) => {
        const id = req.params.id;
        const { status } = req.body;
    
        db.product.destroy({
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
            console.error('Error deleting product records:', err);
            res.status(500).send({ error: true, message: err.message });
        });
    }




};

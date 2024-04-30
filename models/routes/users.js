var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
var userModel = require('./models/userModel');

/* Get home page. */
router.get('/', function(req, res, next){
    res.render('index', {title: 'add user'});
});

router.post('/add-user', function(req, res, next){

    req.assert('name', 'Name is required').notEmpty()       //validate name
    req.assert('email', 'A valid email is required').isEmail() //validate email
    
    var errors = req.validationError()
    if (!errors) {      //No errors were found. passed validation
        var userDetails = new userModel({
            name: req.body.name,
            email: req.body.email,
        });

        userDetails .save((err, doc) => {
            if (!err){
                req.flash('success', 'User added successfully!');
                res.redirect('/');
           

            }
            else 
                
                console.log('Error during record insertion : ' + err);

        });

        }
    else {
        var erro_msg = ''
        errors.forEach(function(error) {
            error_msg += error_msg + '<br>'
        })
        req.flash('error', error_msg)

        res.render('/', {
            title: 'Add New User',
            name: req.body.name,
            email: req.body.email
        })
    }

});

module.exports = router;
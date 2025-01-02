console.log('index router')
const express = require('express');
const router = express.Router();
const forms = require('../config/forms.js')
const params = {
    "forms": forms
};


router.get('/', function(req, res){
    res.render('index', params)
})

module.exports = router;
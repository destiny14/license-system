var express = require('express');
var router = express.Router();
var license = require('../license.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/processPayment', function(req, res, next){
	// process the payment here... 

	// proper input validation wouldn't hurt, too
	var error = false;
	if (req.body.inputSurname === 'undefined' || req.body.inputSurname == ''){
		error = true;
	}
	if (req.body.inputName === 'undefined' || req.body.inputName == ''){
		error = true;
	}

	if (error){
		res.render('index', { title: 'Express', error: 'Bitte Namen und Nachnamen angeben!' });
	}

	// store the licensee's data
	license.licensee.surname = req.body.inputSurname;
	license.licensee.name = req.body.inputName;
	license.licensee.licenseType = req.body.selectFeatureLevel;
	// let's pretend the payment was made
	license.paymentSucceeded = true;
	res.render('payment_success', {surname: license.licensee.surname, name: license.licensee.name});
});

router.post('/createLicense', function(req, res, next){
	var lic = license.createLicense();
	res.render('license_success', {license: lic});
});

module.exports = router;

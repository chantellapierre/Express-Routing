const express = require('express');
const app = express();
const { findMode, findMean, findMedian, convertArray } = require('./helpers');
const ExpressError = require('./expressError');

app.get('/mean', function(req, res, next) {
	if (!req.query.nums) {
		throw new ExpressError('Enter a comma-separated list of numbers', 400);
	}
	let numsAsStrings = req.query.nums.split(',');
	// check for bad input
	let nums = convertArray(numsAsStrings);
	if (nums instanceof Error) {
		throw new ExpressError(nums.message);
	}

	let result = {
		operation: 'mean',
		result: findMean(nums)
	};

	return res.send(result);
});

app.get('/median', (req, res, next) => {
	if (!req.query.nums) {
		throw new ExpressError('Enter a comma-separated list of numbers', 400);
	}
	let numsAsStrings = req.query.nums.split(',');
	// check for bad input
	let nums = convertArray(numsAsStrings);
	if (nums instanceof Error) {
		throw new ExpressError(nums.message);
	}

	let result = {
		operation: 'median',
		result: findMedian(nums)
	};

	return res.send(result);
});

app.get('/mode', function(req, res, next) {
	if (!req.query.nums) {
		throw new ExpressError('Enter a comma-separated list of numbers', 400);
	}
	let numsAsStrings = req.query.nums.split(',');
	// check for bad input
	let nums = convertArray(numsAsStrings);
	if (nums instanceof Error) {
		throw new ExpressError(nums.message);
	}

	let result = {
		operation: 'mode',
		result: findMode(nums)
	};

	return res.send(result);
});

/** Handle 404 errors  **/

app.use(function(req, res, next) {
	const err = new ExpressError('Not Found', 404);

	// pass error to next piece of middleware
	return next(err);
});

/* Handle 500 errors */

app.use(function(err, req, res, next) {
	res.status(err.status || 500);

	return res.json({
		error: err,
		message: err.message
	});
});

app.listen(3000, function() {
	console.log(`Server on port 3000`);
});

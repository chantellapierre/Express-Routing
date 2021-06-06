/** Function to convert array of strings to nums **/

function convertArray(numsAsStrings) {
	let result = [];

	for (let i = 0; i < numsAsStrings.length; i++) {
		let valToNumber = Number(numsAsStrings[i]);

		if (Number.isNaN(valToNumber)) {
			return new Error(`'${numsAsStrings[i]}' not a valid number at index ${i}`);
		}

		result.push(valToNumber);
	}
	return result;
}

/**Frequency count function  **/

function FrequencyCounter(arr) {
	return arr.reduce(function(acc, next) {
		acc[next] = (acc[next] || 0) + 1;
		return acc;
	}, {});
}

/**Mode function **/

function findMode(arr) {
	let freqCounter = FrequencyCounter(arr);

	let count = 0;
	let mostFrequent;

	for (let key in freqCounter) {
		if (freqCounter[key] > count) {
			mostFrequent = key;
			count = freqCounter[key];
		}
	}

	return +mostFrequent;
}

/**Mean function **/

function findMean(nums) {
	if (nums.length === 0) return 0;
	return (
		nums.reduce(function(acc, cur) {
			return acc + cur;
		}) / nums.length
	);
}

/**Median function **/

function findMedian(nums) {
	// sort and get the middle element

	nums.sort((a, b) => a - b);

	let middleIndex = Math.floor(nums.length / 2);
	let median;

	if (nums.length % 2 === 0) {
		median = (nums[middleIndex] + nums[middleIndex - 1]) / 2;
	} else {
		median = nums[middleIndex];
	}
	return median;
}

module.exports = {
	createFrequencyCounter,
	findMean,
	findMedian,
	findMode,
	convertArray
};

var IntervalAcitonCreator = require('../actions/IntervalActionCreator');

module.exports = {
	getIntervals: function() {
		return [
			{
				time: 1, 
				period: 'h'
			},
			{
				time: 6,
				period: 'h'
			},
			{
				time: 1,
				period: 'd'
			},
			{
				time: 3,
				period: 'd'
			},
			{
				time: 5,
				period: 'd'
			}
		];
	}
};
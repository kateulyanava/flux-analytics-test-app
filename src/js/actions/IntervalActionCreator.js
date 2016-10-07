var AnalyticsAppDispatcher = require('../dispatchers/AnalyticsAppDispatcher');
var AppConstants = require('../constants/Constants');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {
	receiveIntervals: function(intervals) {
		AnalyticsAppDispatcher.dispatch({
			type: ActionTypes.RECEIVE_INTERVALS,
			intervalsData: intervals
		});
	},

	setInterval: function(interval) {
		AnalyticsAppDispatcher.dispatch({
			type: ActionTypes.SET_INTERVAL,
			interval: interval
		});
	}
};
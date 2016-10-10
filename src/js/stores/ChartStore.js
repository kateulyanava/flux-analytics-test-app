var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AnalyticsAppDispatcher = require('../dispatchers/AnalyticsAppDispatcher');
var IntervalsStore = require('./IntervalsStore');
var AppConstants = require('../constants/Constants');
var DataProvider = require('../providers/DataProvider');

var ActionTypes = AppConstants.ActionTypes;

var CHANGE_EVENT = 'change';

var _chartData;

function _getChartData(interval) {
	return DataProvider.getChartData(interval);
}

var ChartStore = assign({}, EventEmitter.prototype, {
	getChartData: function() {
		return _chartData;
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	subscribe: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	unsubscribe: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

ChartStore.dispatchToken = AnalyticsAppDispatcher.register(function(action) {
	switch(action.type) {
		case ActionTypes.SET_INTERVAL: 
			AnalyticsAppDispatcher.waitFor([IntervalsStore.dispatchToken]);
			_chartData = _getChartData(action.interval);
			ChartStore.emitChange();
			break;
			
		case ActionTypes.RECEIVE_INTERVALS:
			AnalyticsAppDispatcher.waitFor([IntervalsStore.dispatchToken]);
			_chartData = _getChartData(IntervalsStore.getCurrentInterval());
			ChartStore.emitChange();

		default:
			break;
	}
});

module.exports = ChartStore;
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AnalyticsAppDispatcher = require('../dispatchers/AnalyticsAppDispatcher');
var AppConstants = require('../constants/Constants');

var ActionTypes = AppConstants.ActionTypes;

var CHANGE_EVENT = 'change';

var _intervals,
	_currentInterval;

function mapInterval(interval) {
	return String.prototype.concat(interval.time, interval.period.toUpperCase());
}

var IntervalsStore = assign({}, EventEmitter.prototype, {
	init: function(intervalsData, defaultInterval) {
		_intervals = intervalsData.map(mapInterval);
		_currentInterval = defaultInterval ? mapInterval(defaultInterval) : _intervals[0];
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	subscribe: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	unsubscribe: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	getIntevals: function() {
		return _intervals;
	},

	getCurrentInterval: function() {
		return _currentInterval;
	},

	isCurrent: function(interval) {
		return _currentInterval === interval;
	}
});

IntervalsStore.dispatchToken = AnalyticsAppDispatcher.register(function(action) {
	switch(action.type) {
		case ActionTypes.RECEIVE_INTERVALS:
			IntervalsStore.init(action.intervalsData);
			IntervalsStore.emitChange();
			break;

		case ActionTypes.SET_INTERVAL:
			_currentInterval = action.interval;
			IntervalsStore.emitChange();
			break;

		default:
			console.log('WARNING: unspecified event occured - ' + action.type);
			break;
	}
});

module.exports = IntervalsStore;
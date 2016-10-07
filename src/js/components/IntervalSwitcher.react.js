var React = require('react');
var IntervalItem = require('./IntervalItem.react');
var IntervalsStore = require('../stores/IntervalsStore');

var intervals;

function getIntervalItem(interval, i) {
	return <IntervalItem interval={interval} current={IntervalsStore.isCurrent(interval)} key={i} />;
}

function getState() {
	return {
		currentInterval: IntervalsStore.getCurrentInterval()
	};
}

var IntervalSwitcher = React.createClass({
	componentDidMount: function() {
		IntervalsStore.subscribe(this._onChange);
	},

	componentWillUnmount: function() {
		IntervalsStore.unsubscribe(this._onChange);
	},

	getInitialState: function() {
		return getState();
	},

	render: function() {
		var intervals = IntervalsStore.getIntevals().map(getIntervalItem);

		return (
			<ul className="toggle1">
				{intervals}
			</ul>
		);
	},

	_onChange: function() {
		this.setState(getState());
	}
});

module.exports = IntervalSwitcher;
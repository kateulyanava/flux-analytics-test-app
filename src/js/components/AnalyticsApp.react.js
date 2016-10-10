var React = require('react');
var IntervalSwitcher = require('./IntervalSwitcher.react');
var Chart = require('./Chart.react');
var DataTable = require('./DataTable.react');

var AnalyticsApp = React.createClass({
	render: function() {
		return (
			<div>
				<IntervalSwitcher />
				<Chart />
			</div>
		);
	}	
});

module.exports = AnalyticsApp;
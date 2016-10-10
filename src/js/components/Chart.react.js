var React = require('react');
var ReactDOM = require('react-dom');
var Highcharts = require('highcharts');
var ChartStore = require('../stores/ChartStore');

function _getState() {
	return { data: ChartStore.getChartData() };
};

var Chart = React.createClass({
	render: function() {
		if (this._chart) {
			this._chart.update({
				series: [{ data: _getState().data}]
			}, true);
		}

		return (
			<div className="chart" ref="element"></div>
		);
	},

	getInitialState: function() {
		return _getState();
	},

	componentDidMount: function() {
		ChartStore.subscribe(this._onChange);

		this._chart = new Highcharts['Chart'](this.refs.element, {
			title: {
				text: 'Analytics'
			},
			series: [{ 
				name: 'Price',
				data: _getState().data
			}]
		});
	},

	componentWillUnmount: function() {
		ChartStore.unsubscribe(this._onChange);

		if (this._chart) {
			this._chart.destroy();
		}
	},

	_onChange: function() {
		this.setState(_getState());
	}
});

module.exports = Chart;
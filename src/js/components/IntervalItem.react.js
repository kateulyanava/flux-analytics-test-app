var React = require('react');
var IntervalActionCreator = require('../actions/IntervalActionCreator');

var IntervalItem = React.createClass({
	propTypes: {
		interval: React.PropTypes.string,
		current: React.PropTypes.bool
	},

	render: function() {
		return <li><a href="javascript:void(0);" onClick={this._onClick} className={this.props.current ? 'selected': null}>{this.props.interval}</a></li>
	},

	_onClick: function() {
		IntervalActionCreator.setInterval(this.props.interval);
	}
});

module.exports = IntervalItem;
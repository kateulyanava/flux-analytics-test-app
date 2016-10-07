var AnalyticsApp = require('./components/AnalyticsApp.react')
var React = require('react');
var ReactDOM = require('react-dom');
var DataProvider = require('./providers/DataProvider');
var IntervalActionCreator = require('./actions/IntervalActionCreator');

IntervalActionCreator.receiveIntervals(DataProvider.getIntervals());

ReactDOM.render(<AnalyticsApp />, document.getElementById('main'));
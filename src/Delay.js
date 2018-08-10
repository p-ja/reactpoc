import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

class Delay extends React.Component {

	render() {
		return (
			<TableRow>
				<TableCell><Typography variant="display1">{this.props.delay.routeId}</Typography></TableCell>
				<TableCell>{this.props.delay.headsign}</TableCell>
				<TableCell>{this.renderEstimatedTime(this.props.delay.estimatedTime)}</TableCell>
				<TableCell>{this.renderDelay(this.props.delay.delayInSeconds)}</TableCell>
			</TableRow>
		);
	}

	renderEstimatedTime(estimatedTime) {
		var estimatedTimeArray = estimatedTime.split(':');
		var d = new Date();
		d.setHours(estimatedTimeArray[0]);
		d.setMinutes(estimatedTimeArray[1]);
		var color = d < this.props.timeInFuture ? "primary" : "default" ;
		return (
			<Typography variant="display1" color={color}>{estimatedTime}</Typography>
		);
	}

	renderDelay(delayInSeconds) {
		var delayInMinutes = Math.floor(delayInSeconds / 60);
		var styling = delayInMinutes > 2 ? "error" : "default";
		var delayText = " "
		if (delayInMinutes < 0) {
			delayText = "przed czasem " + Math.abs(delayInMinutes) + " min.";
		} else if (delayInMinutes !== 0) {
			delayText = delayInMinutes + " min. opóźnienia"
		}
		return (
			<Tooltip title={delayInSeconds} placement="left">
				<Typography color={styling}>
					{delayText}
				</Typography>
			</Tooltip>
		);
	}
}

export default Delay;

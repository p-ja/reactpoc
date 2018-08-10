import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Delay from './Delay.js';

class Stop extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			"lastUpdate" : new Date().toLocaleTimeString(),
			"delay" : []
		};

		var d = new Date();
		d.setMinutes(d.getMinutes() + 3);
		this.timeInFuture = d;

	}

	componentDidMount() {
		this.fetchDelays();
		this.timerID = setInterval(
			() => this.fetchDelays(), 10000
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	fetchDelays() {
		console.log(this.props.stopid + " loading...");
		var url = 'http://localhost:8080/87.98.237.99:88/delays?stopId=' + this.props.stopid;
		fetch(url).then(results => {
			return results.json();
		}).then(data => {
			this.setState(data);
			console.log(this.props.stopid + " loaded.");
		});
	}

	render() {
		return this.state.delay.length ? this.renderStop() : this.renderPlaceholder();
	}

	renderStop() {
		var timeInFuture = this.timeInFuture;
		return (
			<Card>
				<CardHeader title={this.props.stopid} subheader={this.state.lastUpdate} />
				<CardContent>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Linia</TableCell>
								<TableCell>Do</TableCell>
								<TableCell>Odjazd</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.state.delay.map(function(delay, index) {
								return <Delay delay={delay} timeInFuture={timeInFuture} />
							})}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		);
	}

	renderPlaceholder() {
		return (
			<Card>
				<CardContent>
					<Typography>Loading...</Typography>
				</CardContent>
			</Card>
		);
	}
}

export default Stop;

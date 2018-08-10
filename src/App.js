import React, { Component } from 'react';
import './App.css';
import Stop from './Stop.js';

class App extends Component {
	render() {
	return (
		<div className="App">
			<header className="App-header">
				<h1 className="App-title">Wróbla Staw</h1>
			</header>
			<div style={{padding:20}}>
				<Stop stopid="14532" />
				<Stop stopid="14549" />
				<Stop stopid="1028" />
			</div>
		</div>
	);
	}
}

export default App;

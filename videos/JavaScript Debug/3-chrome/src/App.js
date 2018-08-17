import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';

class App extends Component {
	render() {
		// const me = 'Ahmad';
		// const wife = 'Maedah';
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
			</div>
		);
	}
}

export default App;

import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { isToggleOn: true };

		// This binding is necessary to make `this` work in the callback
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const name = 'Ahmad';
		this.setState(prevState => ({
			isToggleOn: !prevState.isToggleOn
		}));
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">VSCode.pro: Chrome + React App Frontend Debugging! FTW!</h1>
				</header>
				<button onClick={this.handleClick}>{this.state.isToggleOn ? 'OFF' : 'ON'}</button>
			</div>
		);
	}
}

export default App;

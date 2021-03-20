import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Redirect, Route } from 'react-router';

import './theme/variables.css';

import SetupPage from './pages/setup/SetupPage';
import StartupPage from "./pages/main/StartupPage";

const App: React.FC = () => (
	<BrowserRouter>
		<Route path="/setup/" component={SetupPage} />

		<Route path="/startup/" component={StartupPage} />

		<Route path="/" exact render={() => <Redirect to="/startup/"></Redirect>}></Route>
	</BrowserRouter>
);

export default App;


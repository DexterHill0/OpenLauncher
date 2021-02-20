import React from 'react';
import {
	IonApp,
	IonPage,
	IonRouterOutlet,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router';


import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/variables.css';

import SetupPage from './pages/setup/SetupPage';
import StartupPage from './pages/main/startup/StartupPage';

const App: React.FC = () => (
	<IonApp>
		<IonReactRouter>
			<IonPage>
				<IonRouterOutlet animated={true}>
					<Route path="/setup/" component={SetupPage} />

					<Route path="/main/startup" component={StartupPage} />

					<Route path="/" exact render={() => <Redirect to="/main/startup/"></Redirect>}></Route>

					<Route path="/openlauncher/authorize/" render={() => <div>Please wait...</div>} />

					{/* <Route path="/home/" component={Main} />

					<Route path="/" exact render={() => <Redirect to="/home/" />} /> */}
				</IonRouterOutlet>
			</IonPage>
		</IonReactRouter>
	</IonApp>
);

export default App;


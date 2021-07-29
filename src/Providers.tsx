import React from 'react';

import { Provider } from "jotai";
import ToastProvider from './providers/ToastProvider';

export const Providers: React.FC = ({ children }) => {
	return (
		<Provider>
			<ToastProvider>
				{children}
			</ToastProvider>
		</Provider>
	);
};

export default Providers;
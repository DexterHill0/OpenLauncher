import React from 'react';

import { Provider } from "jotai";
import { ApiStatusProvider } from './providers/APIStatusProvider';


export const Providers: React.FC = ({ children }) => {
    return (
        <Provider>
            <ApiStatusProvider>
                {children}
            </ApiStatusProvider>
        </Provider>
    );
};

export default Providers;
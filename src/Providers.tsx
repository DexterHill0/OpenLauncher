import React from 'react';

import { Provider } from "jotai";
import { OfflineProvider } from './providers/OfflineProvider';


export const Providers: React.FC = ({ children }) => {
    return (
        <Provider>
            <OfflineProvider>
                {children}
            </OfflineProvider>
        </Provider>
    );
};

export default Providers;
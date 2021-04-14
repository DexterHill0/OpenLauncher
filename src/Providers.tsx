import React from 'react';

import { Provider } from "jotai";

export const Providers: React.FC = ({ children }) => {
    return (
        <Provider>
            {children}
        </Provider>
    );
};

export default Providers;
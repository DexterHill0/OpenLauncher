import React from 'react';

import { Provider } from "jotai";


interface Props { }

export const Providers: React.FC<Props> = ({ children }) => {
    return (
        <Provider>
            {children}
        </Provider>
    );
};

export default Providers;
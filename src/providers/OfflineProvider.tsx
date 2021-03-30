
import React from "react";

const offlineContext = React.createContext(false);

const OfflineProvider: React.FC = ({ children }) => {
    const [val, setVal] = React.useState(navigator.onLine)

    window.addEventListener('offline', () => setVal(true));
    window.addEventListener('online', () => setVal(false));

    return (
        <offlineContext.Provider
            value={val}
        >
            {children}
        </offlineContext.Provider>
    );
};

export { OfflineProvider, offlineContext }
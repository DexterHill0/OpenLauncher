
import React from "react";

const apiStatusContext = React.createContext(false);

const ApiStatusProvider: React.FC = ({ children }) => {
    const [val, setVal] = React.useState(navigator.onLine)

    window.addEventListener("offline", () => setVal(true));
    window.addEventListener("online", () => setVal(false));

    return (
        <apiStatusContext.Provider
            value={val}
        >
            {children}
        </apiStatusContext.Provider>
    );
};

export { ApiStatusProvider, apiStatusContext }
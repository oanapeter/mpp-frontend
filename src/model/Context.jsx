import React from "react";

const CatsContext = React.createContext({
    cats: [],
    setCats: () => {}
});

export { CatsContext}
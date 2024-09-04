import {createContext} from "react";


const PriceContext = createContext({'price': 0});
PriceContext.displayName = "AnumPrice";

export default PriceContext;

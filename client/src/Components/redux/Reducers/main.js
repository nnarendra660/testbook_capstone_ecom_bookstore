import { getProductsreducer } from "./productreducer";
import {combineReducers} from "redux";

const rootreducers = combineReducers({
    getProductsdata:getProductsreducer
});

export default rootreducers;
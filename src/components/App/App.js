import React, {useReducer} from 'react';
import styles from './App.module.css';
import MainPage from "../MainPage/MainPage";
import AppContext from "./../../contexts/AppContext";
import {CHANGE_AMIIBOS} from "./../../constants/actionTypes";

const appState = {
    amiibos: [],
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'lalala':
            return ({...state})
        case CHANGE_AMIIBOS:
            return ({...state, amiibos: action.amiibos})
        default:
            return 'Error';
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, appState);

    return (
        <AppContext.Provider value={{...state, dispatch}}>
            <div className={styles.app}>
                <MainPage />
            </div>
        </AppContext.Provider>
    );
}

export default App;

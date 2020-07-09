import React, {useReducer} from 'react';
import styles from './App.module.css';
import MainPage from "../MainPage/MainPage";
import AppContext from "./../../contexts/AppContext";
import {CHANGE_AMIIBOS, CHANGE_GAMESERIES} from "./../../constants/actionTypes";

const appState = {
    amiibos: [],
    gameseries: ['Please Wait'],
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'lalala':
            return ({...state})
        case CHANGE_AMIIBOS:
            return ({...state, amiibos: action.amiibos})
        case CHANGE_GAMESERIES:
            return ({...state, gameseries: action.gameseries})
        default:
            return 'Error';
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, appState);

    return (
        <AppContext.Provider value={{...state, dispatch}}>
            <div className={styles.app}>
                <MainPage/>
            </div>
        </AppContext.Provider>
    );
}

export default App;

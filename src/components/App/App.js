import React, {useReducer} from 'react';
import styles from './App.module.css';
import MainPage from "../MainPage/MainPage";
import AppContext from "./../../contexts/AppContext";
import amiibos from './../../data/amiibos.json';
import Amiibo from './../../models/Amiibo';

const appState = {
    amiibos: amiibos.map(a=> new Amiibo(a)),
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'lalala':
            return ({...state})
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

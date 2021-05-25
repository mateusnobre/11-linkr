import React from 'react';
import { useState } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UserContext from './contexts/UserContext';

export default function App() {
    const[userData,  setUserData] = useState({
        'name': 'John Doe',
        'image': 'john@mail.com',
        'password': '123',
        'token': 'None',
        'dailyProgress': 50
    });

    return(
        <UserContext.Provider value={{userData, setUserData}}>
            <BrowserRouter>
		    	<Switch>
		    		<Route path="/" exact>
                        asfoahsfuashfua
                    </Route>
                </Switch>
		    </BrowserRouter>
        </UserContext.Provider>
    )
}
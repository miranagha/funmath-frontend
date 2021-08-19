import React, { Component } from 'react';
import Login from './Login';
import signup from './signup';
import './App.css'
import { Route, Switch } from 'react-router-dom';
import home from './home';

import {Provider} from 'react-redux'

import thunk from 'redux-thunk'
import rootReducers from './reducers'
import {createStore,applyMiddleware} from 'redux'

const store = createStore(rootReducers,applyMiddleware(thunk));
class App extends Component {
 
	render() {
		return (
            <>
    <Provider store={store}> 
			<main>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/signup" component={signup} />
                <Route path="/home" component={home} />
            </Switch>
        </main>
        
    </Provider>
    </>
			
		);
	}
}

export default App;
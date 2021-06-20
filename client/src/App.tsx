import React from 'react';
import './App.css';
import {
    BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { TextEditor } from '@components/TextEditor';
import { v4 as uuid } from 'uuid';

function App() {
    return (
        <div className='App'>
            <Router>
                <Switch>
                    <Route path='/' exact>
                        <Redirect to={`/documents/${uuid()}`} />
                    </Route>
                    <Route path='/documents/:id' exact>
                        <TextEditor />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;

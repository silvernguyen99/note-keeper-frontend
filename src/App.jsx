import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import dotenv from 'dotenv';


import { Nav, PrivateRoute } from '_components';
import { Home } from 'home/Home';
import { EditNote } from 'home/Edit';
import { CreateNote } from 'home/Create';
import { Login } from 'login/Login';

function App() {
    const pathname = useLocation().pathname || '';
    dotenv.config();
    return (
        <div>
            <Nav />
            <div className="container pt-4">
                <Switch>
                    <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute path="/edit/:id" component={EditNote} />
                    <PrivateRoute path="/create" component={CreateNote} />
                    <Route path="/login" component={Login} />
                    <Redirect from="*" to="/" />
                </Switch>
            </div>
        </div>
    );
}

export { App }; 
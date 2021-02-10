import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from './pages/Register';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {/* Rotas Acessiveis a todos */}
                <Route path="/" exact component={Register} />
            </Switch>
        </BrowserRouter>
    );
}

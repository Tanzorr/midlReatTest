import React from "react";
import {privateRoutes, publicRoutes} from "../router";
import { Route,Switch,  Redirect } from "react-router-dom";
import {RoutNames} from '../router/index';
import {useTypeSelector} from "../hooks/useTypeSelector";

const AppRouter =()=>{
    const {isAuth}= useTypeSelector(state => state.auth);
    return(
        isAuth === true
            ?
        <Switch>
            {privateRoutes.map(route =>
                <Route
                    path={route.path}
                    exact={route.exact}
                    component ={route.component}
                    key ={route.path}
                />
            )}
            <Redirect to={RoutNames.EVENT}/>
        </Switch>
            :
            <Switch>
                {publicRoutes.map(route =>
                    <Route
                        path={route.path}
                        exact={route.exact}
                        component ={route.component}
                        key ={route.path}
                    />
                )}
                <Redirect to={RoutNames.LOGIN}/>
            </Switch>

    );
}

export default AppRouter;
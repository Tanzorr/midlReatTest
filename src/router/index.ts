import React from "react";
import Login from "../pages/Login";
import Event from "../pages/Event";

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
};

export enum RoutNames {
    LOGIN ='/login',
    EVENT ='/'
}

export const  publicRoutes: IRoute[] = [
    {
        path:RoutNames.LOGIN,
        exact:true,
        component: Login,

    }
];

export const  privateRoutes: IRoute[] = [
    {
        path: RoutNames.EVENT,
        exact:true,
        component: Event,

    }
];
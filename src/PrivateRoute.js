import React from 'react'
import {Route, Redirect} from "react-router-dom"
import Cookies from 'universal-cookie'

export default function PrivateRoute({component, path}) {
    const cookies = new Cookies();
    var tokenCookie = cookies.get("token")
    if (tokenCookie == null) {return <Redirect to="/auth" />}
    return (<Route path={path} component={component}/>)
}

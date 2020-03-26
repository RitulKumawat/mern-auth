import React, { Component, Fragment } from 'react';
import AppNavbar from './navbar';
import {AuthContext} from '../contexts/AuthContext'

class Home extends Component {
    static contextType = AuthContext;

    render(){
        if(!this.context.isAuthenticated){
            return(
                <Fragment>
                    <AppNavbar/>
                    <div class="homeCenter">
                        <h2>You are not logged in, so sign in or register new user from the above links</h2>
                    </div>
                </Fragment>
            )
        } else {
            return ( 
                <Fragment>
                    <AppNavbar/>
                    <div className="homeCenter">
                        <h2>You are logged in as {this.context.currentUser}</h2>
                        <h2>Your email : {this.context.currentEmail}</h2>
                    </div>
                </Fragment>
            )
        }
    }
}
 
export default Home;
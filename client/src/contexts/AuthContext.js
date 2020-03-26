import React, { Component, createContext } from 'react';

export const AuthContext = createContext()

class AuthContextProvider extends Component {

    state = {
        isAuthenticated : false,
        currentUser : null,
        currentEmail : null 
    }

    login = res => {
        if(res.data.success){
            this.setState({
                isAuthenticated : true,
                currentUser : res.data.user.name,
                currentEmail : res.data.user.email
            })
        }
    }

    logout = () => {
        localStorage.removeItem('token')
        this.setState({
            isAuthenticated : false,
            currentEmail : null,
            currentUser : null
        })
        window.location.reload()
    }

    render(){
        return(
            <AuthContext.Provider value = {{
                ...this.state,
                logout : this.logout,
                login : this.login
            }}>
            {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export default AuthContextProvider
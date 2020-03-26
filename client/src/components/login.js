import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap'
import { login } from '../actions/auth'
import { AuthContext } from '../contexts/AuthContext'
import AppNavbar from './navbar';

class Login extends Component {

    static contextType = AuthContext

    state = { 
        msg : null,
        variant : "success",
        token : localStorage.getItem('token')
    }

    onChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    componentDidUpdate(){
        if(this.context.isAuthenticated){
            this.props.history.push('/')
        }
    }

    onSubmit = e => {
        e.preventDefault();

        const {password, email, token} = this.state;
        const data = {password, email, token};

        //Attempt to login
        login(data, res => {
            console.log(res)
            if(res.data.success){
                this.setState({
                    msg : res.data.msg,
                    variant : "success"
                })
                this.context.login(res)
            } else {
                this.setState({
                    msg : res.data.msg,
                    variant : "danger"
                })
            }
        }) 
    }

    render() { 
        return ( 
            <div>
            <AppNavbar/>
            <Form onSubmit={this.onSubmit} id="login">

            {this.state.msg ? (
                <Alert variant={this.state.variant}>{this.state.msg}</Alert>
            ) : null }

            <Form.Group>
              <h4>Login here...</h4>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control name="email" onChange={this.onChange} type="email" placeholder="Enter email" />
              </Form.Group>
          
              <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" onChange={this.onChange} type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit">
                  Submit
              </Button>
          </Form>
            </div>
        );
    }
}
 
export default Login;
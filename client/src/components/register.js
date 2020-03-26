import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext'
import { register } from '../actions/auth'
import AppNavbar from './navbar';

class Register extends Component {

    static contextType = AuthContext;

    state = {
        name : null,
        email : null,
        variant : null,
        password : null,
        msg : null,
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

        const { name, email , password } = this.state;

        //Create new user
        const newUser = {
            name, email, password
        }

        // Register
        register(newUser, res => {
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
            <Form onSubmit={this.onSubmit} id="register">

            {this.state.msg ? (
                <Alert variant={this.state.variant}>{this.state.msg}</Alert>
            ) : null }

            <Form.Group>
              <h4>Register here...</h4>
            </Form.Group>

            <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" onChange={this.onChange} type="text" placeholder="Name" />
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


export default Register;
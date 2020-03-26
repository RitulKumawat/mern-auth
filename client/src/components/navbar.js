import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap'
import { AuthContext } from '../contexts/AuthContext'

class AppNavbar extends Component {

    static contextType = AuthContext
 
    render() { 
        
        if(this.context.isAuthenticated){
            return (
                <div>
                    <Navbar variant="dark" bg="dark">
                    <Navbar.Brand href="/">MERN AUTH</Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end">
                    <Nav className="mr-left">
                        <Nav.Link href="#">
                            <Button onClick={() => this.context.logout()}>Logout</Button>
                        </Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                    </Navbar> 
                </div>
            )
        } else {
            return(
                <div>
                    <Navbar variant="dark" bg="dark">
                    <Navbar.Brand href="/">MERN AUTH</Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse className="justify-content-end">
                    <Nav className="mr-left">

                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>

                    </Nav>
                    </Navbar.Collapse>
                    </Navbar> 
                </div>
            )
        }

    }
}
 
export default AppNavbar;

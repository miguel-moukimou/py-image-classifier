import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navigation = () => {
    return (
        <Navbar bg="dark" variant="dark" className='mb-3'>
            <Navbar.Brand href="/"></Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/list">Images</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default Navigation;
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useFirebase } from '../context/firebase';
const NavBar = () =>{
    const firebase = useFirebase();
    const user = firebase.isLoggedIn;
    return (

            <Navbar bg="dark" data-bs-theme="dark">
        <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            {user ? (
                <>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/addListing">Add Listing</Nav.Link>
                        <Nav.Link href="/book/orders">Orders</Nav.Link>
                        <Nav.Link href="/user/logOut">Logout</Nav.Link>
                    </Nav>
                </>
            ): (
                <>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/addListing">Add Listing</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                </>
            )}
          
        </Container>
      </Navbar>
    )
}

export default NavBar;

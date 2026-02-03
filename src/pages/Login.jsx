import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState , useEffect } from 'react';
import { useFirebase } from '../context/firebase';
import {useNavigate} from "react-router-dom";

const LoginPage = () =>{
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const firebase = useFirebase();
    const navigate = useNavigate();
    useEffect(()=>{
        if(firebase.isLoggedIn)
        {
            navigate("/");
        }
    },[firebase,navigate]);
    const handleLogin = async (e) =>{
        e.preventDefault();
        console.log("Signing ....");
        const result = await firebase.LoginUser(email, password);
        console.log("Signed !!!",result);

    }
    return(
        <div className='container mt-5'>
            <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={e=> setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={e=> setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Log In
      </Button>
    </Form>
    <br />
    <h2>OR</h2>
    <br />
    <Button onClick={firebase.GoogleLogIn}  variant="danger" type="submit">
        Google
      </Button>
        </div>
    );
}

export default LoginPage;
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState,useEffect} from "react";
import { useFirebase } from '../context/firebase';
import {useNavigate} from "react-router-dom";
const RegisterPage = () =>{
    const firebase = useFirebase();
    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();
        useEffect(()=>{
            if(firebase.isLoggedIn)
            {
                navigate("/");
            }
        },[firebase,navigate]);
    return (
        <div className="container mt-5">
             <Form onSubmit={async (e)=> {
                e.preventDefault();
                console.log("Sigining Up...");
                const result = await firebase.RegisterUser(firstName,lastName,email,password);
                console.log("Success... ",result);}}>
      <Form.Group className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control onChange={e=> setFirstName(e.target.value)} value={firstName} type="text" placeholder="Enter first name" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control onChange={e=> setLastName(e.target.value)} value={lastName} type="text" placeholder="Enter last name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={e=> setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={e=> setPassword(e.target.value)} value={password} type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Account
      </Button>
    </Form>
        </div>
    );
}

export default RegisterPage;
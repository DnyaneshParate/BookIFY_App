import Button from 'react-bootstrap/Button';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';


const LogoutPage = () =>{
    const navigate  = useNavigate();
    const firebase = useFirebase();
    const HandleLogout = async () =>{
        await firebase.LoggedOut();
        navigate("/");
    }
    return (
        <div className='container mt-5 loaderPosition'>
            <div>Do you Want to Logout ??</div>
            <div className='flex' style={{margin : "10px"}}>
                <Button variant='danger' style={{margin : "10px"}} onClick={HandleLogout} >Yes</Button>
                <Button variant='success' style={{margin : "10px"}} onClick={()=> navigate("/")}>NO</Button>
            </div>
        </div>
    )
}

export default LogoutPage;
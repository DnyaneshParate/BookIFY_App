import {useParams} from "react-router-dom";
import { useFirebase } from "../context/firebase";
import { useEffect,useState } from "react";
import Button from 'react-bootstrap/Button';

const ViewOrderDetailPage = () =>{
    const firebase  = useFirebase();
    const params = useParams();
    const [orders,setOrders] = useState([]);
    useEffect(()=>{
        firebase.GetDetails(params.bookID).then((orders)=>setOrders(orders.docs))
        // console.log(params.docs);
    },[])
    return (
        <div className="container mt-5">
            <h2>Orders </h2>
            {
                orders.map(order=> {
                    const data = order.data();
                    return( 
                        <div className="container mt-5" style={{ border : "1px solid" , padding : "15px" , borderRadius: "8px"}}>
                            <h5>Orderd By : {data.username}</h5>
                            <h5>Quantity : {data.qty}</h5>
                            <h5>Email : {data.userEmail}</h5>
                            {/* <p id="orderConfirm">Do you want to proceed with the order ?  <Button variant="success" >Yes</Button> <Button variant="primary" >No</Button></p> */}
                        </div>)
                })
            }
        </div>
    )
}

export default ViewOrderDetailPage;
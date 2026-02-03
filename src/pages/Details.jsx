import { useParams } from "react-router-dom";
import { useEffect ,useState} from "react";
import { useFirebase } from "../context/firebase";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const BookDetailPage = () =>{
    const firebase = useFirebase();  
    const [data,setData] = useState(null);
    const [qty,setQty] = useState(1);
    const params = useParams();
    useEffect(()=>{
        firebase.GetBook(params.bookId).then(value => setData(value.data()))
    },[])
    if(data === null)
    {
        return <h1>Loading .....</h1>
    }
    const HandleClick = async (e) =>{
        e.preventDefault();
        await firebase.PlaceOrder(params.bookId,qty);
    }
    return <div className="container mt-3">
        <img src={data.coverPic} style={{borderRadius: "10px"}} width={"350px"} alt="image" />
        <h3>{data.bookName}</h3>
        <p><b>Book Name : </b>{data.bookName}</p>
        <p><b>Author Name : </b>{data.author}</p>
        <p><b>Book Price : </b>{data.price}</p>
        <p><b>ISBN Number : </b>{data.isnbNum}</p>
        <p><b>Seller Name : </b>{data.seller}</p>
        <p><b>Seller's Email : </b>{data.sellerEmail}</p>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Qty</Form.Label>
            <Form.Control onChange={e=> setQty(e.target.value)} value={qty} type="number" />
        </Form.Group>
        <Button onClick={HandleClick} variant="success">Buy Now</Button>
    </div>
}

export default BookDetailPage;
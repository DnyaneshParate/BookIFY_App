import {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from "../context/firebase";
const ListingPage  = () =>{
    const [bookName,setBookName] = useState("");
    const [author,setAuthor] = useState("");
    const [price,setPrice] = useState("");
    const [isbnNum,setIsbnNum] = useState("");
    const [seller,setSeller] = useState("");
    const [sellerEmail,setSellerEmail] = useState("");
    const [coverPic,setCoverPic] = useState(null);
    const firebase  = useFirebase();

    const HandleSubmit = async (e) => {
  e.preventDefault();

  if (!coverPic) {
    alert("Please select a cover image");
    return;
  }

  try {
    await firebase.AddListing(
      bookName,
      author,
      price,
      isbnNum,
      coverPic,
      seller,
      sellerEmail
    );
    alert("Book added successfully");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};


    return (
        <Form className="mt-5 ms-5 me-5" onSubmit={HandleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Enter Book Name</Form.Label>
        <Form.Control onChange={e=> setBookName(e.target.value)} value={bookName} type="text" placeholder="Enter first name" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Name of Author</Form.Label>
        <Form.Control onChange={e=> setAuthor(e.target.value)} value={author} type="text" placeholder="Enter author name" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Enter Price</Form.Label>
        <Form.Control onChange={e=> setPrice(e.target.value)} value={price} type="text" placeholder="Enter price" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>ISBN Number</Form.Label>
        <Form.Control onChange={e=> setIsbnNum(e.target.value)} value={isbnNum} type="text" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Cover Image</Form.Label>
        <Form.Control onChange={e=> setCoverPic(e.target.files[0])}  type="file" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Enter Seller's Name</Form.Label>
        <Form.Control onChange={e=> setSeller(e.target.value)} value={seller} type="text" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Enter Seller's email</Form.Label>
        <Form.Control onChange={e=> setSellerEmail(e.target.value)} value={sellerEmail} type="email" placeholder="Enter Seller's email" />
      </Form.Group>
      <Button variant="success" type="submit">
       Add Book
      </Button>
    </Form>
    )
}

export default ListingPage;
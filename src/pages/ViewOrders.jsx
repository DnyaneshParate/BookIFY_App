import { useFirebase } from "../context/firebase";
import { useEffect,useState } from "react";
import CheckCard from "../components/CheckDetails";
import SpecialLoader from "../components/SpecialLoader";
const OrdersPage = () =>{
    const firebase = useFirebase();
    const [books,setBooks] = useState([]);
    useEffect(() => {
    if (firebase.isLoggedIn) {
        firebase.GettingAllBooks().then((snapshot) => {
        setBooks(snapshot.docs);
        });
    }
    }, [firebase.isLoggedIn]);
    if(books.length === 0)
    {
        return <SpecialLoader/>
    }
    console.log(books);
    if(!firebase.isLoggedIn) return <h1>Please Log In</h1>
    return (
        <div className="container gridCard">
            <div className="grid-container">
            {
                books.map(book => <CheckCard link ={`/books/orders/${book.id}`} key={book.id} id={book.id} {...book.data()}/>)
            }
            </div>
        </div>
    );
}

export default OrdersPage;
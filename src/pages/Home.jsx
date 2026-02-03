import { useEffect ,useState} from "react";
import { useFirebase } from "../context/firebase";
import CardBook from "../components/Card";
import SpecialLoader from "../components/SpecialLoader";

const HomePage = () =>{
    const firebase = useFirebase();
    const [books,setBooks] = useState([]);
    useEffect(()=>{
        firebase.GettingAllBooks().then(books=> setBooks(books.docs));
    },[])
    if(books.length === 0)
    {
        return <SpecialLoader text={"Loading home Screen ...."}/>
    }
    return (
        <div className="container mt-5 ms-5 me-5 gridCard">
          <div className="grid-container">
             {books.map(book=> <CardBook link={`/book/view/${book.id}`} key={book.id} id={book} {...book.data()} />)}
          </div>
        </div>
    );
}

export default HomePage;
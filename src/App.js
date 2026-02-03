import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Routes,Route} from "react-router-dom";


// Pages 
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import ListingPage from './pages/AddList';
import LogoutPage from './pages/Logout';
import HomePage from './pages/Home';
import BookDetailPage from './pages/Details';
import OrdersPage from './pages/ViewOrders';
import ViewOrderDetailPage from './pages/ViewOrderDetailPage';
//Components
import NavBar from './components/Navbar';
function App() {
  return (
    <div className="app">
        <NavBar />
        <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/register' element={<RegisterPage/>} />
            <Route path='/addListing' element={<ListingPage/>} />
            <Route path='/user/logOut' element={<LogoutPage/>} />
            <Route path='/book/view/:bookId' element={<BookDetailPage/>} />
            <Route path='/book/orders' element={<OrdersPage/>} />
            <Route path='/books/orders/:bookID' element={<ViewOrderDetailPage/>} />
        </Routes>
    </div>
  );
}

export default App;

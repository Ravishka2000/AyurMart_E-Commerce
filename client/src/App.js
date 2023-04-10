import React from "react";
import Header from "./components/buyerComponents/Header";
import Home from "./components/buyerComponents/Home";
import Footer from "./components/buyerComponents/Footer";
import Product from "./components/buyerComponents/Product";
import Cart from "./components/buyerComponents/Cart";
import Contact from "./components/buyerComponents/Contact";
import { Routes,Route,Navigate} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import HomeLogin from './pages/Home';

function App() {
  const { user } = useAuthContext()
    return (
        <React.Fragment>
            <Header>
                <Header />
            </Header>

            <main style={{ marginBottom: "50px" }}>
                <Routes>
                    <Route path="/" element={<Home />} exact></Route>
                    <Route path="/product/:id" element={<Product />} exact></Route>
                    <Route path="/cart" element={<Cart />} exact></Route>
                    <Route path="/" element={user ? <HomeLogin /> : <Navigate to="/login"></Navigate>}/>
                    <Route path="/signup" element={!user ? <Signup /> :<Navigate to="/"></Navigate>}/>
                    <Route path="/login" element={!user ? <Login /> :<Navigate to="/"></Navigate>}/>
                    <Route path="/contact" element={<Contact />} exact></Route>
                </Routes>
            </main>

            <Footer>
                <Footer />
            </Footer>

        </React.Fragment>
    );
}

export default App;
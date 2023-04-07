import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/buyerComponents/Header";
import Home from "./components/buyerComponents/Home";
import Footer from "./components/buyerComponents/Footer";

function App() {
    return (
        <React.Fragment>
            <Header>
                <Header />
            </Header>
            <main>
                <Routes>
                    <Route path="/" element={<Home />} exact></Route>
                </Routes>
            </main>
            
                <Footer />
            
        </React.Fragment>
    );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ProductsContextProvider } from './context/ProductContext';
import { SellerAuthContextProvider } from './context/SellerAuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
        <React.StrictMode>
            <AuthContextProvider>
                <SellerAuthContextProvider>
                    <ProductsContextProvider>
                        <App />
                    </ProductsContextProvider>
                </SellerAuthContextProvider>
            </AuthContextProvider>
        </React.StrictMode>
    </BrowserRouter>

);
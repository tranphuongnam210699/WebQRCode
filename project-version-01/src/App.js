import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

// import component

import CreateUser from './components/createUser';
import ProductList from './Page/Products/ProductList';
import Home from './components/Home';
import AddProduct from './Page/Products/AddProduct';
// import QRCode from './components/QRCode';
import ScanQRCode from './Page/ScanQRCode/ScanQRCdoe';
import Navbar from './components/navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <br />
            <div className=''>
                <Route path='/' exact component={Home}/>
                <Route path='/products' exact component={ProductList} />
                <Route path='/addProduct' exact component={AddProduct} />
                <Route path='/user' exact component={CreateUser} />
                <Route path='/scanqrcode' exact component={ScanQRCode} />
                {/* <Route path='/QRCode' exact component={QRCode}/> */}
            </div>
        </Router>
    );
}

export default App;

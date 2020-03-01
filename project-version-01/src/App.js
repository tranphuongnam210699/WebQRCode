import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

// import component
import Navbar from './components/navbar';
import CreateUser from './components/createUser';
import ProductList from './components/ProductList';
import Home from './components/Home';
import AddProduct from './components/AddProduct';

function App() {
    return (
        <Router>
            <Navbar />
            <br />
            <div className='container'>
                <Route path='/' exact component={Home}/>
                <Route path='/products' exact component={ProductList} />
                <Route path='/addProduct' exact component={AddProduct} />
                <Route path='/user' exact component={CreateUser} />
            </div>
        </Router>
    );
}

export default App;

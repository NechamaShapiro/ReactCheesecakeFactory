import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './Pages/Home';
import PlaceOrder from './Pages/PlaceOrder';
import ViewOrders from './Pages/ViewOrders';
import Success from './Pages/Success';
import OrderDetails from './Pages/OrderDetails';

class App extends React.Component {

    render() {
        return (
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/placeorder' element={<PlaceOrder />} />
                    <Route exact path='/orderdetails' element={<OrderDetails />} />
                    <Route exact path='/vieworders' element={<ViewOrders />} />
                    <Route exact path='/success' element={<Success />} />
                </Routes>
            </Layout>
        );
    }
};

export default App;
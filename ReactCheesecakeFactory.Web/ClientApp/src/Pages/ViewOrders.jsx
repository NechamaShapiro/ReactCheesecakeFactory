import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const ViewOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            const { data } = await axios.get('/api/cheesecake/getorders');
            setOrders(data);
        }

        getOrders();
    }, []);

    return (
        <table className="table text-center shadow-lg" style={{ borderCollapse: 'separate', borderSpacing: '0px 15px', maxWidth: '90%' }}>
            <thead>
                <tr style={{ backgroundColor: 'rgb(33, 37, 41)', color: 'white', borderRadius: '15px' }}>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Base Flavor</th>
                    <th>Toppings</th>
                    <th>Special Requests</th>
                    <th>Quantity</th>
                    <th>Delivery Date</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                    <tr key={order.id} style={{ backgroundColor: "#f8f9fa", borderRadius: "15px" }}>
                        <td style={{ paddingTop: "15px", paddingBottom: "15px" }}>
                            <Link to={`/orderdetails/${order.id}`}>
                                {order.name}
                            </Link>
                            {/* <Link to={`/placeorder`}>
                                {order.name}
                            </Link> */}
                        </td>
                        <td style={{ paddingTop: "15px", paddingBottom: "15px" }}>
                            {order.email}
                        </td>
                        <td>{order.baseFlavor}</td>
                        <td>{order.toppings || 'N/A'}</td>
                        <td>{order.specialRequests || 'N/A'}</td>
                        <td>{order.quantity}</td>
                        <td>{dayjs(order.deliveryDate).format('MM/DD/YYYY')}</td>
                        <td>{`$${order.total.toFixed(2)}`}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ViewOrders;
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="d-flex align-items-center justify-content-center" style={{height: '100vh', backgroundColor: 'rgb(238, 238, 238)',}}>
            <div className="text-center">
                <h1 className="display-4">Welcome to the Cheesecake Factory</h1>
                <p className="lead">
                    <Link to='/placeorder'>
                        Click here to order your own custom cheesecake                    
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Home;
import React, { useState } from 'react';
import { produce } from 'immer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

let chosenToppings = [];

const PlaceOrder = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [baseFlavor, setBaseFlavor] = useState('Choose...');
    const [toppings, setToppings] = useState([]);
    const [specialRequests, setSpecialRequests] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [deliveryDate, setDeliveryDate] = useState('');
    const [isSubmitting, setIsSumbitting] = useState(false);

    const onCheckboxChange = e => {
        if(toppings.includes(e.target.name)){
            setToppings(toppings.filter(t => t !== e.target.name));
        }
        else{
            setToppings([...toppings, e.target.name]);
        }
    }
    const computeTotal = () => {
        if(baseFlavor === 'Choose...') {
            return 0;
        }

        return (49.99 + (toppings.length * 3.95)) * quantity;
    }

    const isFormValid = !!name && !!email && baseFlavor !== 'Choose...' && +quantity > 0 && !!deliveryDate;

    const onSubmitClick = async () => {
        setIsSumbitting(true);
        await axios.post('/api/cheesecake/placeorder', {
            name, 
            email, 
            baseFlavor, 
            toppings: toppings.join(', '), 
            specialRequests, 
            quantity, 
            deliveryDate,
            total: computeTotal()
        }); 
        setIsSumbitting(false);
        navigate('/success');
    }
    return (
        <div>
            <div className="container" style={{ marginTop: '80px' }}>
                <h1 className="text-center my-4">Cheesecake Factory Order Form</h1>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" name="name" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Cheesecake Base Flavor ($49.99)</label>
                            <select className="form-select" name="baseFlavor" onChange={e => setBaseFlavor(e.target.value)} >
                                <option>Choose...</option>
                                <option>Classic</option>
                                <option>Chocolate</option>
                                <option>Peanut Butter</option>
                                <option>Caramel</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Toppings (each topping adds an additional $3.95)</label>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="Chocolate Chips" onChange={onCheckboxChange} />
                                <label className="form-check-label">Chocolate Chips</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="Caramel Drizzle" onChange={onCheckboxChange} />
                                <label className="form-check-label">Caramel Drizzle</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="Whipped Cream" onChange={onCheckboxChange} />
                                <label className="form-check-label">Whipped Cream</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="Cookie Dough" onChange={onCheckboxChange} />
                                <label className="form-check-label">Cookie Dough</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="White Chocolate Shavings" onChange={onCheckboxChange} />
                                <label className="form-check-label">White Chocolate Shavings</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="Peanut Butter Drizzle" onChange={onCheckboxChange} />
                                <label className="form-check-label">Peanut Butter Drizzle</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="Dark Chocolate Drizzle" onChange={onCheckboxChange} />
                                <label className="form-check-label">Dark Chocolate Drizzle</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Special Requests</label>
                            <textarea className="form-control" rows="3" name="specialRequests" value={specialRequests} onChange={e => setSpecialRequests(e.target.value)} ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Quantity</label>
                            <input type="number" className="form-control" min="1" name="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Delivery Date</label>
                            <input type="date" className="form-control" name="deliveryDate" onChange={e => setDeliveryDate(e.target.value)} value={deliveryDate} />
                        </div>
                        <button type="submit" disabled={!isFormValid || isSubmitting} className="btn btn-primary" onClick={onSubmitClick}>
                        {isSubmitting ? 'Submitting...' : 'Submit Order'}
                        </button>
                    </div>
                    <div className="col-md-6 position-sticky" style={{ top: '2rem' }}>
                        <h2 className="mb-4">Live Preview</h2>
                        <div className="card" style={{ width: '18rem' }}>
                            {baseFlavor == "Choose..." && <img src="/empty.jpg" className="card-img-top" alt="Cheesecake"></img>}
                            {baseFlavor == "Classic" && <img src="/classic.jpg" className="card-img-top" alt="Cheesecake"></img>}
                            {baseFlavor == "Chocolate" && <img src="/chocolate.jpg" className="card-img-top" alt="Cheesecake"></img>}
                            {baseFlavor == "Peanut Butter" && <img src="/peanut butter.jpg" className="card-img-top" alt="Cheesecake"></img>}
                            {baseFlavor == "Caramel" && <img src="/caramel.jpg" className="card-img-top" alt="Cheesecake"></img>}

                            <div className="card-body">
                                <h5 className="card-title">Your Custom Cheesecake</h5>
                                <p className="card-text">Base: {baseFlavor}</p>
                                <p className="card-text">Toppings: </p>
                                {toppings.includes('Chocolate Chips') && <img src="/chocolate chips.jpg" className="card-img-top" style={{ width: '25%' }} alt="Topping"></img>}
                                {toppings.includes('Caramel Drizzle') && <img src="/caramel drizzle.jpg" className="card-img-top" style={{ width: '25%' }} alt="Topping"></img>}
                                {toppings.includes('Whipped Cream') && <img src="/whipped cream.jpg" className="card-img-top" style={{ width: '25%' }} alt="Topping"></img>}
                                {toppings.includes('Cookie Dough') && <img src="/cookie dough.jpg" className="card-img-top" style={{ width: '25%' }} alt="Topping"></img>}
                                {toppings.includes('White Chocolate Shavings') && <img src="/white chocolate shavings.jpg" className="card-img-top" style={{ width: '25%' }} alt="Topping"></img>}
                                {toppings.includes('Peanut Butter Drizzle') && <img src="/peanut butter drizzle.jpg" className="card-img-top" style={{ width: '25%' }} alt="Topping"></img>}
                                {toppings.includes('Dark Chocolate Drizzle') && <img src="/dark chocolate drizzle.jpg" className="card-img-top" style={{ width: '25%' }} alt="Topping"></img>}
                                <p className="card-text">Special Requests: {specialRequests}</p>
                                <p className="card-text">Quantity: {quantity}</p>
                                <p className="card-text">Delivery Date: {deliveryDate}</p>
                                <p className="card-text fw-bold">Total: {`$${computeTotal().toFixed(2)}`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaceOrder;
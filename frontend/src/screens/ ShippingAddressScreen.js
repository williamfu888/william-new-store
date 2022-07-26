import React,{useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useContext} from 'react';
import {Store} from '../Store';
import {useNavigate} from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../components/CheckoutSteps';

export default function  ShippingAddressScreen() {
    const {state, dispatch: ctxDispatch} = useContext(Store);
    console.log("state", state);
    const { 
        userInfo,
        cart:{
        shippingAddress:{
        fullName:fullName_store,
        address: address_store,
        city:city_store,
        postalCode:postalCode_store,
        country:country_store
    }
    }
    } = state;
    const [fullName, setFullName] = useState(fullName_store?fullName_store:'');
    const [address, setAddress] = useState(address_store?address_store:'');
    const [city, setCity] = useState(city_store?city_store:'');
    const [postalCode, setPostalCode] = useState(postalCode_store?postalCode_store:'');
    const [country, setCountry] = useState(country_store?country_store:'');
    const navigate = useNavigate();
    useEffect(()=>{
        if(!userInfo) {
            navigate('/signin?redirect=/shipping');
        }
    },[userInfo,navigate])
    
    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({
            type:'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country
            }
        })
        localStorage.setItem('shippingAddress', JSON.stringify({ fullName,
            address,
            city,
            postalCode,
            country})
            )
           navigate('/payment');
    }
  return (
    <div className="text-start">
        <Helmet>
            <title>Shipping Address</title>
        </Helmet> 
        <CheckoutSteps step1 step2></CheckoutSteps>
        <div className="small-container">
        <h1>Shipping Address</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control value={fullName} onChange={e=>setFullName(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control value={address} onChange={e=>setAddress(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="fullName">
                <Form.Label>City</Form.Label>
                <Form.Control value={city} onChange={e=>setCity(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control value={postalCode} onChange={e=>setPostalCode(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control value={country} onChange={e=>setCountry(e.target.value)} required/>
            </Form.Group>
            <div className="mb-3">
                <Button variant="primary" type="submit">Continue</Button>
            </div>
        </Form>
        </div>
    </div>
  )
}

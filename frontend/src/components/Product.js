import { Card } from "react-bootstrap";
import {useContext} from "react";
import Button from 'react-bootstrap/Button';
import {Link, useNavigate} from 'react-router-dom';
import Rating from './Rating';
import axios from "axios";
import {Store} from '../Store';
function Product(props) {
  const navigate = useNavigate();
  const {product} = props;
  const {state, dispatch:cxtDispatch} = useContext(Store);
  
  const addCartHandler = async () => {
    const {cart} = state;
    const existItem = cart.cartItems.find(item => item._id ===product._id);
    let quantity =  existItem? existItem.quantity+1: 1;
    const {data} = await axios.get(`/api/products/${product._id}`);
    if(data.countInStock<quantity) {
        window.alert('Sorry, Product is out of stock');
        return;
    }
    cxtDispatch({type: "CART_ADD_ITEM", payload:{...product, quantity:quantity}})     
    navigate('/cart');
  }
    return (
        <Card>
            <Link to ={`/product/${product.slug}`}>
                <img src={product.image} className="card-img-top" alt = {product.name}/>
            </Link>
            <Card.Body>
                <Link to={`/product/${product.slug}`}>
                    <Card.Title>{product.name}</Card.Title>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews}/>
               <Card.Text>${product.price}</Card.Text>
               {product.countInStock ===0? <Button variant="light" disabled>Out of Stock</Button>:
               <Button onClick={()=>addCartHandler()}>Add To Cart</Button>}
               
            </Card.Body>
        </Card>
    )
}
export default Product;
import {useContext} from 'react';
import {Store} from '../Store';
import {Helmet} from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import MessageBox from '../components/MessageBox';
import {Link,useNavigate} from 'react-router-dom';
export default function CartScreen() {
    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {
        cart:{cartItems}
    } = state;
    const minusQuantityHanlder = (product) => {

        ctxDispatch({type: "CART_ADD_ITEM", payload:{...product, quantity:product.quantity-1}})     
   
    }
    const addQuantityHanlder = (product) => {
        console.log('dd',product);
        ctxDispatch({type: "CART_ADD_ITEM", payload:{...product, quantity:product.quantity+1}})     
    }
    const deleteHandler = (item) => {
        ctxDispatch({type: "CART_REMOVE_ITEM", payload:item})  
    }
    const checkOutHandler = () => {
        navigate('/signin?redirect=/shipping')
    }
    return (
        <div >
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>
            <h1>Shopping Cart</h1>
            <Row>
                <Col md={8}>
                    {cartItems.length === 0 ? (
                        <MessageBox>
                            Cart is empty. <Link to ="/">Go Shopping</Link>
                        </MessageBox>
                    ): (
                        <ListGroup>
                            { 
                                cartItems.map(item => 
                                    <ListGroup.Item key={item._id}>
                                        <Row className="align-items-center">
                                            <Col md={4}>
                                                <img src={item.image}
                                                alt={item.name}
                                                className="img-fluid rounded img-thumbnail"
                                                >
                                                </img>{' '}
                                                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={3}>
                                                <Button variant="light" disabled ={item.quantity ===1} onClick={()=>minusQuantityHanlder(item)}>
                                                   {' '} <i className="fas fa-minus-circle"></i>
                                                </Button>
                                                <span>{item.quantity}</span>{' '}
                                                <Button variant="light"  onClick={()=>addQuantityHanlder(item)}>
                                                    <i className="fas fa-plus-circle"></i>
                                                </Button>
                                            </Col>
                                            <Col md={3}>${item.price*item.quantity}</Col>
                                            <Col md={2}>
                                                <Button variant ="light" onClick={()=>deleteHandler(item)}>
                                                    <i className="fa fa-trash"></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )
                            }
                        </ListGroup>
                    )
                }
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>
                                        Subtotal (
                                            {
                                             cartItems.reduce((a,c)=>a+c.quantity,0)
                                            }{' '} itmes):
                                            ${cartItems.reduce((a,c)=>a+c.price*c.quantity,0)}
                                        )
                                    </h3>
                                </ListGroup.Item>
                                <ListGroup>
                                    <div className="d-grid">
                                        <Button type="button" variant="primary"
                                        disabled={cartItems.length===0}
                                        onClick = {()=>checkOutHandler()}
                                        >Proceed to Checkout
                                        </Button>
                                    </div>
                                </ListGroup>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </div>
    )
}
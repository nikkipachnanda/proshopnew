import React from 'react';
import {useParams, Link} from 'react-router-dom';
import products from "../products";
import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import Rating from '../components/Rating';

const ProductScreen = () => {
    
    const { id:productId} = useParams();
    const product = products.find((p)=> p._id === productId);
   // console.log(products);
    return (
    <div>
      <div> Products Screens</div>  
      
            <Link className='btn btn-light my-3' to="/"> Go Back</Link>
            <Row>
                <Col md={5}> <Image src={product.image} alt={product.name} fluid></Image>  </Col>
                <Col md={3}> 
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            <ListGroup.Item>
                              Price: ${product.price}
                            </ListGroup.Item>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}> </Col>
            </Row>

    </div>
  )
}

export default ProductScreen

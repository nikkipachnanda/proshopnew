import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import products from "../products";
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";

//import axios from 'axios';

const ProductScreen = () => {
  // const [product, setProduct] = useState({});

  // const product = products.find((p)=> p._id === productId);

  // useEffect(()=>
  //     {

  //       const fetchProduct = async ()=>
  //         {
  //           const {data} = await axios.get(`/api/products/${productId}`);
  //           setProduct(data)
  //         }

  //         fetchProduct();

  //     },[])

  // console.log(products);

  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  console.log("data cart" + JSON.stringify(product));

  const addToCartHandler =()=> 
    {
      dispatch(addToCart({...product, qty}));
      navigate('/cart');
    }


  console.log("data" + JSON.stringify(product));
  return (
    <div>
      <div> Products Screens</div>

      <Link className="btn btn-light my-3" to="/">
        {" "}
        Go Back
      </Link>

      {isLoading ? (
        <h2>
            <Loader/>
        </h2>
      ) : error ? (
        <Message variant='danger'>{error?.data.message || error.error}</Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              {" "}
              <Image src={product.image} alt={product.name} fluid></Image>{" "}
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>

              

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                  <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                </ListGroup.Item>

                {
                product.countInStock > 0 && 
                (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                      <Form.Control as="select" value={qty} onChange={(e)=> setQty(Number(e.target.value))}>
                        {[...Array(product.countInStock).keys()].map((x)=> (
                          <option key={x+1} value={x+1}>
                            {x+1}
                          </option>
                          ) )}
                      </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item> 
                <Button
                 className="btn-block"
                 type='button'
                 disabled={product.countInStock ===0} 
                 onClick={addToCartHandler}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>

              </ListGroup>

          

            </Col>
            <Col md={3}> </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ProductScreen;

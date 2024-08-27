//import React, { useEffect, useState } from 'react';
import {Row, Col, Spinner} from 'react-bootstrap';
//import products from "../products";
import Product from '../components/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
//import axios from 'axios';

const HomeScreen = () => {

  // const [products, setProducts] = useState([]);

  // useEffect(()=>
  //   {

  //     const fetchProducts = async ()=> 
  //       {
  //         const {data} = await axios.get('/api/products');
  //         setProducts(data)
  //       }

  //       fetchProducts();
        
  //   },[])

  const { data:products, isLoading, error} = useGetProductsQuery();


  return (
    <>
    { isLoading ? (
      <h2>
        <Loader/>
      </h2>
    ): error ? (
      <Message variant='danger'>{error?.data.message || error.error}</Message>
    ) : (
      <>
      <Row>
            <h1>Latest Products  </h1>
            {products?.map ((product)=> (
                <Col key={product._id}  sm={12} md={6} lg={4} xl= {3} >
                   <Product product={product}></Product>
                </Col> 
            ))}
        </Row>
      </>
    )}
        
    </>
  )
}

export default HomeScreen

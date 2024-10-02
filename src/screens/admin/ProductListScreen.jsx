import React from "react";
import { Button, Table, Col, Row } from "react-bootstrap";
import { FaEdit, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../../components/Loader";
import { Message } from "@mui/icons-material";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import Paginate from "../../components/Paginate";




const ProductListScreen = () => {

  const {pageNumber} = useParams();
  const { data, isLoading, error , refetch} = useGetProductsQuery({pageNumber});

 // console.log("products list" + JSON.stringify(products));

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const deleteHandler = async (id) => {
    if(window.confirm('Are you want to delete')) {
       try {
        await deleteProduct(id);
        refetch();
       } catch(err) {
        toast.error(err?.data?.Message || err.error);
       }
    }
  };

  const [deleteProduct, {isLoading:loadingDelete}] = useDeleteProductMutation();

 
  const createProductHandler = async () => {
    if (window.confirm("Are you sure want to create new product")) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.Message || err.error);
      }
    }
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createProductHandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"></Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm mx-2">
                            <FaEdit />
                        </Button>
                        </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} ></Paginate>
        </>
      )}
    </div>
  );
};

export default ProductListScreen;
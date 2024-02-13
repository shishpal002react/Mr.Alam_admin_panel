/** @format */
import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Link, useParams } from "react-router-dom";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const [ image , setImage ] = useState('')
  const [ categoryId , setCategoryId ] = useState('')
  const [ subCategoryId , setSubCategoryId ] = useState('')
  const [ discountActive , setDiscountActive ] = useState('')
  const [ originalPrice , setOriginalPrice ] = useState(0)
  const [ discount , setDiscount ] = useState(0)
  const [ productName , setProductName ] = useState('')
  const [ description , setDescription ] = useState('')
  const [ returnPolicy , setReturnPolicy ] = useState('')
  const [ varient , setVarient ] = useState(null)
  const [ size , setSize ] = useState(null)

 
  return (
    <section>
      <p className="headP">Dashboard / </p>
      <section className="sectionCont">
        <Form onSubmit={createProduct}>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              required
              onChange={(e) => setProductName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Images</Form.Label>
            <Form.Control
              type="file"
              multiple
              required
              onChange={(e) => setImage(e.target.files)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Choose Category</Form.Label>
            <Form.Select
              onChange={(e) => {
                setCategoryId(e.target.value);
                getSubCategory(e.target.value);
              }}
              required
            >
              <option>-- Select Category --</option>
              {categoryArr?.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Choose Sub-Category</Form.Label>
            <Form.Select
              onChange={(e) => setSubCategoryId(e.target.value)}
              required
            >
              <option>-- Select Sub-Category --</option>
              {subCatArr?.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <FloatingLabel>
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>MRP</Form.Label>
            <Form.Control
              type="number"
              step={0.01}
              required
              onChange={(e) => setOriginalPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Do you want activate discount in this product
            </Form.Label>
            <Form.Select
              onChange={(e) => setDicountActive(e.target.value)}
              required
            >
              <option></option>
              <option value={"true"}>Yes</option>
              <option value={"false"}>NO</option>
            </Form.Select>
          </Form.Group>

          {discountActive === "true" ? (
            <Form.Group className="mb-3">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                step={0.01}
                min={0}
                max={100}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Form.Group>
          ) : (
            ""
          )}

          <Form.Group className="mb-3">
            <Form.Label>Return Policy</Form.Label>
            <FloatingLabel>
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                required
                onChange={(e) => setReturnPolicy(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Do you want add Varient in this product</Form.Label>
            <Form.Select onChange={(e) => setVariant(e.target.value)} required>
              <option></option>
              <option value={"true"}>Yes</option>
              <option value={"false"}>NO</option>
            </Form.Select>
          </Form.Group>
          {varient === "false" ? (
            <Form.Group className="mb-3">
              <Form.Label>Do you want add Size in this product</Form.Label>
              <Form.Select onChange={(e) => setSize(e.target.value)} required>
                <option></option>
                <option value={"true"}>Yes</option>
                <option value={"false"}>NO</option>
              </Form.Select>
            </Form.Group>
          ) : (
            ""
          )}

          {varient === "false" && size === "false" ? (
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                min={0}
                onChange={(e) => setStock(e.target.value)}
              />
            </Form.Group>
          ) : (
            ""
          )}

          <div className="w-100 d-flex justify-content-between">
            <Button variant="success" type="submit">
              {loading ? <Spinner animation="border" /> : "Submit"}
            </Button>

            <Link to="/Product">
              <Button variant="dark">Back</Button>
            </Link>
          </div>
        </Form>
      </section>
    </section>
  );
};

export default HOC(EditProduct);

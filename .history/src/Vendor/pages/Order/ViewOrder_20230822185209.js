/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import HOC from "../../layout/HOC";

const ViewOrder = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const BaseUrl = "https://ecommerce-backend-ochre-phi.vercel.app/";

  const token = localStorage.getItem("token");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getOrder = async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}api/v1/order/viewOrder/${id}`,
        Auth
      );
      setData(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  function ValueChecker(holder, string) {
    return holder ? (
      <Form.Group className="mb-3">
        <Form.Label> {string} </Form.Label>
        <Form.Control placeholder={holder} disabled />
      </Form.Group>
    ) : (
      ""
    );
  }

  return (
    <>
      <section>
        <p className="headP">Dashboard / {data?.orderId} </p>
        <section className="sectionCont">
          <Form>
            <div className="img-cont">
              {data?.productId?.productImage?.map((i, index) => (
                <img src={i} alt="" className="centerImage" key={index} />
              ))}
            </div>
            {ValueChecker(data?.orderId, "Order Id")}
            {ValueChecker(data?.productId?.productName, "Product Name")}
            {ValueChecker(data?.categoryId?.name, "Category")}
            {ValueChecker(data?.subcategoryId?.name, "Sub Category")}
            {ValueChecker(data?.unitInwords, "Unit")}
            {ValueChecker(data?.productPrice, "Product Price")}
            {ValueChecker(data?.quantity, "Quantity")}
            {ValueChecker(data?.total, "Total Price")}
            {ValueChecker(data?.email, "Customer Email Address")}
            {ValueChecker(data?.firstName, "Customer First Name")}
            {ValueChecker(data?.lastName, "Customer Last Name ")}
            {ValueChecker(data?.phone, "Customer Phone Number ")}
            {ValueChecker(data?.address, "Customer Address ")}
            {ValueChecker(data?.pincode, "Customer Pincode ")}
            {ValueChecker(data?.city, "Customer City ")}
            {ValueChecker(data?.state, "Customer State ")}
            {ValueChecker(data?.country, "Customer Country ")}
            {ValueChecker(data?.paymentOption, "Selected Payment")}
            {ValueChecker(data?.orderStatus, "Selected Payment")}

            <Link to="/Order">
              <Button variant="dark">Back</Button>
            </Link>
          </Form>
        </section>
      </section>
    </>
  );
};

export default HOC(ViewOrder);

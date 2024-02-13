/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import HOC from "../../layout/HOC";

const AdminViewOrder = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [ loading , setLoading ] = useState(false)

  const BaseUrl = "https://ecommerce-backend-ochre-phi.vercel.app/";

  const token = localStorage.getItem("token");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getOrder = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${BaseUrl}api/v1/order/viewOrder/${id}`,
        Auth
      );
      setData(response.data.data);
      setLoading(false)
    } catch (e) {
      console.log(e);
      setLoading(false)
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
       
       {
        loading ?   <Spinner animation="border" role="status" className="loadingSpin" /> : 
       }
       
       
    
      </section>
    </>
  );
};

export default HOC(AdminViewOrder);

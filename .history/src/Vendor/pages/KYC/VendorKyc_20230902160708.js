/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import HOC from "../../layout/HOC";

const VendorKyc = () => {
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
      const response = await axios.get(`${BaseUrl}api/v1/kyc/KycList`, Auth);
      setData(response.data.data[0]);
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
        <p className="headP">Dashboard / </p>
        <section className="sectionCont">

        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
  
          <button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
          >
            Add Category
          </button>
        </div>
          <Form>


            <div className="img-cont">
              <img src={data.aadhar} alt="" className="centerImage" />
              <img src={data.panCard} alt="" className="centerImage" />
              <img src={data.gstNO} alt="" className="centerImage" />
              <img src={data.addressProof} alt="" className="centerImage" />
            </div>
            {ValueChecker(data?.kycStatus, "KYC Status")}

    
          </Form>
        </section>
      </section>
    </>
  );
};

export default HOC(VendorKyc);

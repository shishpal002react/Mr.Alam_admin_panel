/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
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


  function MyVerticallyCenteredModal(props) {
    const [ aadhar , setAadhar ] = useState(null)
    const [ panCard , setPanCard ] = useState(null)
    const [ gstNO , setGstNo ] = useState(null)
    const [ addressProof , setAddressProof ] = useState(null)
    const [errMsg, setErrMsg] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);

    const fd = new FormData()
    fd.append("aadhar" , aadhar)
    fd.append("panCard" , panCard)
    fd.append("gstNO" , gstNO)
    fd.append("addressProof" , addressProof)

    const postHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
        const { data } = await axios.post(
          "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/kyc/addKYC",
          payload,
          Auth
        );
        toast.success(data.message);
        props.onHide();
        fetchData();
        setSubmitLoading(false);
      } catch (e) {
        const msg = e.response.data.message;
        setErrMsg(msg);
        setSubmitLoading(false);
      }
    };

    const putHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
        const { data } = await axios.put(
          `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/Category/updateCategory/${id}`,
          payload,
          Auth
        );
        toast.success(data.message);
        props.onHide();
        fetchData();
        setSubmitLoading(false);
      } catch (e) {
        const msg = e.response.data.message;
        setErrMsg(msg);
        setSubmitLoading(false);
      }
    };

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            {edit ? `Edit ${name}` : " Add Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errMsg === null || !errMsg ? (
            ""
          ) : (
            <div className="dangerBox">
              <Alert variant="danger"> {errMsg} </Alert>
              <i class="fa-solid fa-x" onClick={() => setErrMsg(null)}></i>
            </div>
          )}

          <Form onSubmit={edit ? putHandler : postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Type</Form.Label>
              <Form.Select onChange={(e) => setGender(e.target.value)}>
                <option> {gender} </option>
                <option value="kid">Kid</option>
                <option value="women">Women</option>
                <option value="men">Men</option>
              </Form.Select>
            </Form.Group>

            <Button
              style={{
                backgroundColor: "#0c0c0c",
                borderRadius: "0",
                border: "1px solid #0c0c0c",
              }}
              type="submit"
            >
              {submitLoading === true ? (
                <Spinner size="sm" animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "Submit"
              )}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
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
          <span></span>
            <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider">
              Upload Kyc
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

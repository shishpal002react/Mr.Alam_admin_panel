/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Form, Alert, Button, Spinner } from "react-bootstrap";
import HOC from "../../layout/HOC";
import { toast } from "react-toastify";

const VendorKyb = () => {
  const [data, setData] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const BaseUrl = "https://ecommerce-backend-ochre-phi.vercel.app/";

  const token = localStorage.getItem("token");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getOrder = async () => {
    try {
      const response = await axios.get(`${BaseUrl}api/v1/kyc/KybList`, Auth);
      setData(response.data.data);
      console.log(response.data.data);
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
    const [  certIncorRegi , setCertIncorRegi ] = useState(null)
    const [ excerptStateCompanyRegi ,setExcerptStateCompanyRegi ] = useState(null)
    const [  certIncorIncumbency , setCertIncorIncumbency ] = useState(null)
    const [ CertGoodStanding ,setCertGoodStanding  ] = useState(null)
    const [ memorandum ,setMemorandum ] = useState(null)
    const [ UBOs ,setUBOs ] = useState(null)
    const [ uboShareholderRegi ,setUboShareholderRegi  ] = useState(null)
    const [ uboStatOfInformation , setUboStatOfInformation ] = useState(null)
    const [ uboExcerptStateCompanyRegi , setUboExcerptStateCompanyRegi] = useState(null)
    const [ uboCertIncorIncumbency , setUboCertIncorIncumbency ] = useState(null)
    const [ uboMemorandum ,setUboMemorandum ] = useState(null)
    const [ uboTrustAgreement , setUboTrustAgreement ] = useState(null)
    const [ usEIN , set ] = useState(null)
    const [ ] = useState(null)

    const [errMsg, setErrMsg] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);

    const fd = new FormData();
    fd.append("passPort", passPort);
    fd.append("socialSecurityCard", socialSecurityCard);
    fd.append("dL", dL);
    fd.append("voterIdentityCard", voterIdentityCard);
    fd.append("addressProof", addressProof);

    const postHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
        const { data } = await axios.post(
          "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/kyc/addKYC",
          fd,
          Auth
        );
        toast.success(data.message);
        props.onHide();
        getOrder();
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
            Upload Kyc
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

          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Passport </Form.Label>
              <Form.Control
                type="file"
                required
                onChange={(e) => setPassPort(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>security Proof</Form.Label>
              <Form.Control
                type="file"
                required
                onChange={(e) => setSecurity(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>DL</Form.Label>
              <Form.Control
                type="file"
                required
                onChange={(e) => setDL(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Voter Identity Card</Form.Label>
              <Form.Control
                type="file"
                required
                onChange={(e) => setVoter(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address Proof</Form.Label>
              <Form.Control
                type="file"
                required
                onChange={(e) => setAddressProof(e.target.files[0])}
              />
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
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section>
        <section className="sectionCont">
          <div
            className="pb-4   w-full flex justify-between items-center"
            style={{ width: "98%", marginLeft: "2%" }}
          >
            <span></span>
            <button
              className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
              onClick={() => setModalShow(true)}
            >
              Upload KYB
            </button>
          </div>

          {!data ? (
            <Alert>Upload You'r KYB to access other resources </Alert>
          ) : (
            <Form>
              <div className="img-cont">
                <img
                  src={data?.CertGoodStanding}
                  alt=""
                  className="centerImage"
                />
                <img src={data?.certIncorRegi} alt="" className="centerImage" />
                <img
                  src={data?.excerptStateCompanyRegi}
                  alt=""
                  className="centerImage"
                />
                <img
                  src={data?.certIncorIncumbency}
                  alt=""
                  className="centerImage"
                />

                <img src={data?.memorandum} alt="" className="centerImage" />
                <img
                  src={data?.uboShareholderRegi}
                  alt=""
                  className="centerImage"
                />
                <img
                  src={data?.uboStatOfInformation}
                  alt=""
                  className="centerImage"
                />
                <img
                  src={data?.uboExcerptStateCompanyRegi}
                  alt=""
                  className="centerImage"
                />
                <img
                  src={data?.uboCertIncorIncumbency}
                  alt=""
                  className="centerImage"
                />
                <img src={data?.uboMemorandum} alt="" className="centerImage" />
                <img
                  src={data?.uboTrustAgreement}
                  alt=""
                  className="centerImage"
                />
                <img src={data?.evidence} alt="" className="centerImage" />
              </div>
              {ValueChecker(data?.numberEIN, "EIN Number")}
              {ValueChecker(data?.kybStatus, "KYC Status")}
              {ValueChecker(data?.updatedAt, "Last Updated On")}
              {ValueChecker(data?.status, "Status")}
              {data?.usEIN ? (
                <Form.Group className="mb-3">
                  <Form.Label> USEIN </Form.Label>
                  <Form.Control
                    placeholder={data?.usEIN === true ? "Yes" : "No"}
                    disabled
                  />
                </Form.Group>
              ) : (
                ""
              )}
              {data?.UBOs ? (
                <Form.Group className="mb-3">
                  <Form.Label> UBOS </Form.Label>
                  <Form.Control
                    placeholder={data?.UBOs === true ? "Yes" : "No"}
                    disabled
                  />
                </Form.Group>
              ) : (
                ""
              )}
             
            </Form>
          )}
        </section>
      </section>
    </>
  );
};

export default HOC(VendorKyb);

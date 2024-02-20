/** @format */

import React, {  useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import {
  Table,
  Modal,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const Contect = () => {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [ loading , setLoading ] = useState(false)

  const token = localStorage.getItem("token");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(
        "https://alam-project-backend.vercel.app/api/v1/ContactDetails/viewContactDetails",
        Auth
      );
      setData(data.data);
      setTotal(data.data.length);
      setLoading(false)
    } catch (e) {
      console.log(e);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [fb, setFb] = useState('');
    const [twitter, setTwitter] = useState('');
    const [google, setGoogle] = useState('');
    const [instagram, setInstagram] = useState('');
    const [basketball, setBasketball] = useState('');
    const [behance, setBehance] = useState('');
    const [dribbble, setDribbble] = useState('');
    const [pinterest, setPinterest] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [youtube, setYoutube] = useState('');
    const [map, setMap] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [supportEmail, setSupportEmail] = useState('');
    const [openingTime, setOpeningTime] = useState('');
    const [infoEmail, setInfoEmail] = useState('');
    const [contactAddress, setContactAddress] = useState('');
    const [tollfreeNo, setTollfreeNo] = useState('');
    const [submitLoading, setSubmitLoading] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
   

    const postHandler = async (e) => {
      e.preventDefault();
      const payload={
        fb,
        twitter,
        google,
        instagram,
        basketball,
        behance,
        dribbble,
        pinterest,
        linkedIn,
        youtube,
        map,
        address,
        phone,
        supportEmail,
        openingTime,
        infoEmail,
        contactAddress,
        tollfreeNo,
      }

      setSubmitLoading(true);
      try {
        const { data } = await axios.post(
          "https://alam-project-backend.vercel.app/api/v1/ContactDetails/addContactDetails",
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
            Create Contect Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
     

          <Form onSubmit={postHandler}>

            <Form.Group className="mb-3">
              <Form.Label>FaceBook</Form.Label>
              <Form.Control
                type="text"
                value={fb}
                onChange={(e) => setFb(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Twitter</Form.Label>
              <Form.Control
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Google</Form.Label>
              <Form.Control
                type="text"
                value={google}
                onChange={(e) => setGoogle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Instagram</Form.Label>
              <Form.Control
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Basketball</Form.Label>
              <Form.Control
                type="text"
                value={basketball}
                onChange={(e) => setBasketball(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Behance</Form.Label>
              <Form.Control
                type="text"
                value={behance}
                onChange={(e) => setBehance(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bribbble</Form.Label>
              <Form.Control
                type="text"
                value={dribbble}
                onChange={(e) => setDribbble(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pinterest</Form.Label>
              <Form.Control
                type="text"
                value={pinterest}
                onChange={(e) => setPinterest(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>LinkedIn</Form.Label>
              <Form.Control
                type="text"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Youtube</Form.Label>
              <Form.Control
                type="text"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>SupportEmail</Form.Label>
              <Form.Control
                type="text"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>OpeningTime</Form.Label>
              <Form.Control
                type="text"
                value={openingTime}
                onChange={(e) => setOpeningTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Info Email</Form.Label>
              <Form.Control
                type="text"
                value={infoEmail}
                onChange={(e) => setInfoEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ContactAddress</Form.Label>
              <Form.Control
                type="text"
                value={contactAddress}
                onChange={(e) => setContactAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Map</Form.Label>
              <Form.Control
                type="text"
                value={map}
                onChange={(e) => setMap(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>TollfreeNo</Form.Label>
              <Form.Control
                type="text"
                value={tollfreeNo}
                onChange={(e) => setTollfreeNo(e.target.value)}
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
        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Notification's ( Total : {total} )
          </span>
          <button
            onClick={() => {
              setModalShow(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
          >
            Add Conteact Details
          </button>
        </div>

        <section className="sectionCont">
          <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input
              type="search"
              placeholder="Start typing to search for Notification"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

            {
              loading ? <Spinner animation="border" role="status" className="loadingSpin" /> : 
           data?.length === 0 || !data ? (
            <Alert>Notification Not Found</Alert>
          ) : (
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>Contect</th>
                    <th>Information</th>
                    
                  </tr>
                </thead>

                <tbody>
               
                    <tr style={{width:"100%"}}>
                        <td style={{width:"50%"}}>FaceBook</td>
                      <td>{data?.fb} </td>
                    </tr>
                    <tr >
                        <td>Twitter</td>
                      <td>{data?.twitter} </td>
                    </tr>
                    <tr >
                        <td>FaceBook</td>
                      <td>{data?.fb} </td>
                    </tr>
                    <tr >
                        <td>Google</td>
                      <td>{data?.google} </td>
                    </tr>
                    <tr >
                        <td>Instagram</td>
                      <td>{data?.instagram} </td>
                    </tr>
                    <tr >
                        <td>Basketball</td>
                      <td>{data?.basketball} </td>
                    </tr>
                    {/* <tr >
                        <td>Map</td>
                      <td>{data?.map} </td>
                    </tr> */}
                    <tr >
                        <td>Behance</td>
                      <td>{data?.behance} </td>
                    </tr>
                    <tr >
                        <td>Dribbble</td>
                      <td>{data?.dribbble} </td>
                    </tr>
                    <tr >
                        <td>pinterest</td>
                      <td>{data?.fb} </td>
                    </tr>
                    <tr >
                        <td>Address</td>
                      <td>{data?.address} </td>
                    </tr>
                    <tr >
                        <td>Phone</td>
                      <td>{data?.phone} </td>
                    </tr> <tr >
                        <td>SupportEmail</td>
                      <td>{data?.supportEmail} </td>
                    </tr>
                    <tr >
                        <td>OpeningTime</td>
                      <td>{data?.openingTime} </td>
                    </tr>
                    <tr >
                        <td>InfoEmail</td>
                      <td>{data?.infoEmail} </td>
                    </tr>
                    <tr >
                        <td>ContactAddress</td>
                      <td>{data?.contactAddress} </td>
                    </tr>
                    <tr >
                        <td>TollfreeNo</td>
                      <td>{data?.tollfreeNo} </td>
                    </tr>
                 

                 
                </tbody>
              </Table>
            </div>
          )}
        </section>
      </section>
    </>
  );
};

export default HOC(Contect);

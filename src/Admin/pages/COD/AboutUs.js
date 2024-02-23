/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Modal, Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const AboutUs = () => {
  const [showModel,setShowModel]=useState(false)
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  //edit state
  const [questionEdit,setQuestionEdit]=useState("");
  const [answerEdit,setAnswerEdit]=useState("");

  const token = localStorage.getItem("token");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://alam-project-backend.vercel.app/api/v1/static/getAboutUs",
        Auth
      );
      setData(data.data);
      setTotal(data.data.length);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // delete handler
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://alam-project-backend.vercel.app/api/v1/static/aboutUs/${id}`,
        Auth
      );
      toast.success(data.message);
    
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  // post model
  function MyVerticallyCenteredModal(props) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [errMsg, setErrMsg] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);


    const postHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
        const { data } = await axios.post(
          `https://alam-project-backend.vercel.app/api/v1/static/createAboutus`,
          { title:question, desc:answer },
          Auth
        );
        toast.success(data.message);
        props.onHide();
        fetchData();
        setSubmitLoading(false);
      } catch (e) {
        const msg = e.response?.data?.message || "An error occurred";
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
       
            Edit Aboutus
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errMsg === null || !errMsg ? (
            ""
          ) : (
            <div className="dangerBox">
              <Alert variant="danger"> {errMsg} </Alert>
              <i className="fa-solid fa-x" onClick={() => setErrMsg(null)}></i>
            </div>
          )}

          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
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

  // edit model
  function MyVerticallyCenteredModalEdit(props) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [errMsg, setErrMsg] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);

    useEffect(() => {
      if (props.show === true) {
        setQuestion(questionEdit);
        setAnswer(answerEdit);
      }
    }, [props]);

    const postHandler = async (e) => {
      e.preventDefault();
      setSubmitLoading(true);
      try {
        const { data } = await axios.put(
          `https://alam-project-backend.vercel.app/api/v1/static/aboutUs/${id}`,
          { title:question, desc:answer },
          Auth
        );
        toast.success(data.message);
        props.onHide();
        fetchData();
        setSubmitLoading(false);
      } catch (e) {
        const msg = e.response?.data?.message || "An error occurred";
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
       
            Edit Aboutus
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errMsg === null || !errMsg ? (
            ""
          ) : (
            <div className="dangerBox">
              <Alert variant="danger"> {errMsg} </Alert>
              <i className="fa-solid fa-x" onClick={() => setErrMsg(null)}></i>
            </div>
          )}

          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
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
      <MyVerticallyCenteredModalEdit
        show={modalShowEdit}
        onHide={() => setModalShowEdit(false)}
      />
       <MyVerticallyCenteredModal
        show={showModel}
        onHide={() => setShowModel(false)}
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
            About Us( Total : {total} )
          </span>
          <button type="button"
            onClick={() => {
              setShowModel(true);
            }}
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
          >
            Add About Us
          </button>
        </div>

        <section className="sectionCont">
          {loading ? (
            <Spinner
              animation="border"
              role="status"
              className="loadingSpin"
            />
          ) : data?.length === 0 || !data ? (
            <Alert>Aboutus Not Found</Alert>
          ) : (
            <>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td>{i?.title}</td>
                        <td>{i?.desc}</td>
                        <td>
                          <i
                            className="fa-solid fa-trash"
                            onClick={() => deleteHandler(i._id)}
                          />
                          <i
                            onClick={() => {
                              setModalShowEdit(true);
                              setId(i._id);
                              setQuestionEdit(i.question);
                              setAnswerEdit(i.answer);
                            }}
                              
                            className="fa-solid fa-pen-to-square"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default HOC(AboutUs);

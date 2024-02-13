/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import {
  Table,
  Modal,
  Form,
  Button,
  Alert,
  Badge,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const Order = () => {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);


  const token = localStorage.getItem("token");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/vendor/Orders" , Auth
      );
      setData(data.data);
      setTotal(data.data.length);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);




  function BadgeSelector(status) {
    if (status === "Active") {
      return <Badge bg="success">Active</Badge>;
    } else {
      <Badge bg="info">Non Active</Badge>;
    }
  }

  return (
    <>


      <section>
        <p className="headP">Dashboard / Orders</p>
        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Orders ( Total : {total} )
          </span>
     
        </div>

        <section className="sectionCont">
          {data?.length === 0 || !data ? (
            <Alert>Order Not Found</Alert>
          ) : (
            <>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Option</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        
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

export default HOC(Order);

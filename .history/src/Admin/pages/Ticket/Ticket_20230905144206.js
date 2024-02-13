/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const Ticket = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
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
        "https://ecommerce-backend-ochre-phi.vercel.app/api/v1/admin/ticket/listTicket",
        Auth
      );
      setData(data.data);
      setTotal(data.data.length);
      setLoading(false)
    } catch (e) {
        setLoading(false)
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const closehandler = async (id) => {
    try {
      const response = await axios.put(
        `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/admin/closeTicket/${id}`,
        {},
        Auth
      );
      const msg = response.data.message;
      fetchData();
      toast.success(msg);
    } catch {}
  };

  return (
    <>
      <section>
        <div
          className="pb-4   w-full flex justify-between items-center"
          style={{ width: "98%", marginLeft: "2%" }}
        >
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Ticket's ( Total : {total} )
          </span>
        </div>
        <section className="sectionCont">
        {
            loading ? <Spinner
              animation="border"
              role="status"
              style={{ display: "block", margin: "auto" }} : 
        }
          {}
        </section>
      </section>
    </>
  );
};

export default HOC(Ticket);

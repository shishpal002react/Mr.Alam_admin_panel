/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import HOC from "../../layout/HOC";
import { useParams } from "react-router-dom";

const KybView = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const token = localStorage.getItem("token");

  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/getIdvendorKyb/${id}`,
        Auth
      );
      setData(data.data);
    } catch {}
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            KYB
          </span>
        </div>

        <section className="sectionCont">
          <div className="img-cont">
            <img src={data?.CertGoodStanding} alt="" className="centerImage" />
            <img src={data?.certIncorIncumbency} alt="" className="centerImage" />
            <img src={data?.CertGoodStanding} alt="" className="centerImage" />
            <img src={data?.CertGoodStanding} alt="" className="centerImage" />
            <img src={data?.CertGoodStanding} alt="" className="centerImage" />
            <img src={data?.CertGoodStanding} alt="" className="centerImage" />
            <img src={data?.CertGoodStanding} alt="" className="centerImage" />
            <img src={data?.CertGoodStanding} alt="" className="centerImage" />
          </div>
        </section>
      </section>
    </>
  );
};

export default HOC(KybView);

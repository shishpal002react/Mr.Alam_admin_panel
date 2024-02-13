/** @format */

import React, { useCallback, useEffect, useState } from "react";
import { Table, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import HOC from "../../layout/HOC";
import { Link, useParams } from "react-router-dom";

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
      console.log(data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
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
   


         
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Sub-Category</th>
                      <th>MRP</th>
                      <th>Selling Price</th>
                      <th>Discount</th>
                      <th>Stock</th>
                      <th>Vendor</th>
                      <th>Created At</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td>
                          <img
                            src={i.productImage?.[0]}
                            alt=""
                            style={{ maxWidth: "80px" }}
                          />
                        </td>
                        <td>{i.productName}</td>
                        <td>{i.categoryId?.name}</td>
                        <td>{i.subcategoryId?.name}</td>
                        <td>₹{i.originalPrice}</td>
                        <td>₹{i.discountPrice}</td>
                        <td>{i.discount}%</td>
                        <td>{i.stock}</td>
                        <td> {i.vendorId?.fullName} </td>
                        <td>{i.createdAt?.slice(0, 10)}</td>
                        <td>
                          <span className="flexCont">
                            <Link to={`/admin/product/${i._id}`}>
                              <i className="fa-solid fa-eye" />
                            </Link>
                            <i
                              className="fa-sharp fa-solid fa-trash"
                              onClick={() => deleteHandler(i._id)}
                            ></i>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

        </section>
      </section>
    </>
  );
};

export default HOC(KybView);

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


  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/vendor/Product/delete/${id}`,
        Auth
      );
      toast.success(data.message);
      fetchData();
    } catch (e) {
      console.log(e);
    }
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
            All Products ( Total : {total} )
          </span>
        </div>

        <section className="sectionCont">
          <div className="filterBox">
            <img
              src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
              alt=""
            />
            <input
              type="search"
              placeholder="Start typing to search for Product"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="searchByDate">
            <div>
              <label>Starting Date : </label>
              <input
                type="date"
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            <div>
              <label>Ending Date : </label>
              <input
                type="date"
                onChange={(e) => setToDate(e.target.value)}
                min={fromDate}
              />
            </div>
          </div>

          <div className="searchByDate">
            <div>
              <label>Showing : </label>
              <select onChange={(e) => setLimit(e.target.value)}>
                <option>
                  {" "}
                  Showing {data?.length} out of {total}{" "}
                </option>
                <option value={total}> All </option>
                <option value={10}> 10 </option>
                <option value={20}> 20 </option>
                <option value={50}> 50 </option>
                <option value={100}> 100 </option>
              </select>
            </div>
          </div>
          <div className="searchByDate">
            <div>
              <label>Category : </label>
              <select
                onChange={(e) => setCategoryId(e.target.value)}
                style={{ width: "80%" }}
              >
                <option> </option>
                {categoryArr?.map((i, index) => (
                  <option key={index} value={i._id}>
                    {" "}
                    {i.name}{" "}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Sub-Category : </label>
              <select
                onChange={(e) => setSubCatId(e.target.value)}
                style={{ width: "80%" }}
              >
                <option> </option>
                {subCatArr?.map((i) =>
                  i.subCategory?.map((item, index) =>
                    item.name ? (
                      <option key={index} value={item._id}>
                        {" "}
                        {item.name}{" "}
                      </option>
                    ) : (
                      ""
                    )
                  )
                )}
              </select>
            </div>
          </div>

          <div className="searchByDate">
            <div>
              <label>Vendor : </label>
              <select
                onChange={(e) => setCategoryId(e.target.value)}
                style={{ width: "80%" }}
              >
                <option> </option>
                {categoryArr?.map((i, index) => (
                  <option key={index} value={i._id}>
                    {" "}
                    {i.name}{" "}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading === true ? (
            <Alert>
              {" "}
              Fetching Products Wait <Spinner animation="border" size="lg" />
            </Alert>
          ) : data?.length === 0 || !data ? (
            <Alert>Product Not Found</Alert>
          ) : (
            <>
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

              <div className="pagination">
                <button onClick={() => Prev()} className="prevBtn">
                  <i className="fa-solid fa-backward"></i>
                </button>

                {page === 1 ? (
                  ""
                ) : (
                  <button onClick={() => setPage(1)} className="prevBtn">
                    1
                  </button>
                )}

                <button className="activePage">{page}</button>
                {page === pag?.length ? (
                  ""
                ) : (
                  <button onClick={() => setPage(pag?.length)}>
                    {pag?.length}
                  </button>
                )}
                {page === pag?.length ? (
                  ""
                ) : (
                  <button onClick={() => Next()} className="nextBtn">
                    {" "}
                    <i className="fa-sharp fa-solid fa-forward"></i>
                  </button>
                )}
              </div>
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default HOC(KybView);

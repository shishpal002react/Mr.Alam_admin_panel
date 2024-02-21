/** @format */

import React, { useState } from "react";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { FaPhone } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const Login = () => {
  const [pass, setPass] = useState(false);
  const [inputpass, setInputpass] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [venderName, setVenderName] = useState("")
  const [phone, setPhone] = useState("");


  const [error, setError] = useState(false);

  //set condition
  const [otpVerifyNot, setOtpVerifyNot] = useState(true);
  const [otp, setOtp] = useState("");
  const [venderId, setVenderId] = useState("")

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `https://alam-project-backend.vercel.app/api/v1/vendor/loginwithphone`,
        {
          phone,
          userType: "VENDOR",
        }
      );
      localStorage.setItem("token", data.data.accessToken);
      toast.success("Otp send successfully");
      setVenderId(data?.data?._id)
      setLoading(false);
      setOtpVerifyNot(false)
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  const verifyOptHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `https://alam-project-backend.vercel.app/api/v1/vendor/${venderId}`,
        {
          otp
        }
      );
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("AdminName", data?.data?.fullName);
      navigate("/dashboard");
      toast.success("Welcome Vender");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };


  return (
    <>
      <div
        className="w-full h-screen flex flex-col justify-center items-center "
        style={{ backgroundColor: "#0c0c0c" }}
      >
        <form className="shadow-2xl w-96 mx-3 sm:mx-0 sm:w-4/5 md:w-4/6 lg:w-4/5 xl:w-1/2 flex flex-col items-center bg-white p-5 md:py-10 ">
          <p style={{ fontSize: "2rem" }}> Vendor Panel</p>
          <section className="py-2">
            {error ? (
              <div className="dangerBox">
                <Alert variant="danger">Check Your Credentials</Alert>
                <i class="fa-solid fa-x" onClick={() => setError(false)}></i>
              </div>
            ) : (
              ""
            )}
            {/* <div className="shadow-2xl sm:w-96 border border-[rgb(241,146,46)] space-x-4 flex items-center w-64  p-2 rounded-md ">
              <input
                type="text"
                placeholder="Enter name"
                required
                value={venderName}
                onChange={(e) => setVenderName(e.target.value)}
                className="outline-none px-0.5  bg-transparent tracking-wider w-full"
              />

            </div> */}

            <div className="shadow-2xl sm:w-96 border border-[rgb(241,146,46)] space-x-4 flex items-center w-64  p-2 rounded-md mt-3">
              <input
                type="text"
                placeholder="Enter phone number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="outline-none px-0.5  bg-transparent tracking-wider w-full"
              />
              <FaPhone className="text-xl " />
            </div>

            {
              !otpVerifyNot && (
                <div className="shadow-2xl sm:w-96 border border-[rgb(241,146,46)] space-x-4 flex items-center w-64  p-2 rounded-md mt-3">
                  <input
                    type="text"
                    placeholder="Enter otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                className="outline-none px-0.5  bg-transparent tracking-wider w-full  "
              />

              <span
                onClick={() => {
                  setPass(!pass);
                  setInputpass(!inputpass);
                }}
                className="text-xl cursor-pointer hover:scale-90 "
              >
                {pass ? <VscEyeClosed /> : <VscEye />}
              </span>
            </div>
              )
            }



            {
              otpVerifyNot && (
                <button
                  type="submit"
                  className="EcommerceAdminLogin"
                  onClick={submitHandler}
                >
                  {loading ? (
                    <Spinner size="lg" animation="border" role="status" />
                  ) : (
                    "Send Otp"
                  )}
                </button>
              )
            }

            {
              !otpVerifyNot && (
                <button
                  type="submit"
                  className="EcommerceAdminLogin"
                  onClick={verifyOptHandler}
                >
                  {loading ? (
                    <Spinner size="lg" animation="border" role="status" />
                  ) : (
                    "Send Otp"
                  )}
                </button>
              )
            }

            <br />
            <Link to="/admin-login">
              <button type="button" className="EcommerceAdminLogin">
                Admin Panel
              </button>
            </Link>
            <div style={{ display: 'flex', justifyContent: "space-between", width: "100%" }}>
              <p style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/forget/password")}>Forget Password</p>
              <p style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/new/vender")}>Register New Vender</p>

            </div>

          </section>
        </form>
      </div>
    </>
  );
};

export default Login;

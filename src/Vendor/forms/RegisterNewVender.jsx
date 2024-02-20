/** @format */

import React, { useState } from "react";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const RegisterNewVender = () => {
    const [pass, setPass] = useState(false);
    const [inputpass, setInputpass] = useState(false);
    const [loading, setLoading] = useState(false);

    const [phone, setPhone] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();


    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post(
                "https://alam-project-backend.vercel.app/api/v1/vendor/registration",
                {
                    phone,
                    fullName,
                    email,
                    password,
                    userType: "VENDOR",
                }
            );
            navigate("/");
            toast.success("Account Create successfully");
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
                    <p style={{ fontSize: "2rem" }}> Create New Vender</p>
                    <section className="py-2">
                        {error ? (
                            <div className="dangerBox">
                                <Alert variant="danger">Check Your Credentials</Alert>
                                <i class="fa-solid fa-x" onClick={() => setError(false)}></i>
                            </div>
                        ) : (
                            ""
                        )}

                        <div className="shadow-2xl sm:w-96 border border-[rgb(241,146,46)] space-x-4 flex items-center w-64  p-2 rounded-md">
                            <input
                                type="text"
                                placeholder="Enter name"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="outline-none px-0.5  bg-transparent tracking-wider w-full"
                            />

                        </div>
                        <div className="shadow-2xl sm:w-96 border border-[rgb(241,146,46)] space-x-4 flex items-center w-64  p-2 rounded-md mt-3">
                            <input
                                type="text"
                                placeholder="Enter phone number"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="outline-none px-0.5  bg-transparent tracking-wider w-full"
                            />

                        </div>
                        <div className="shadow-2xl sm:w-96 border border-[rgb(241,146,46)] space-x-4 flex items-center w-64  p-2 rounded-md mt-3">
                            <input
                                type="text"
                                placeholder="Enter Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="outline-none px-0.5  bg-transparent tracking-wider w-full"
                            />
                            <AiOutlineMail className="text-xl " />
                        </div>

                        <div className="shadow-2xl sm:w-96 border border-[rgb(241,146,46)] space-x-4 flex items-center w-64  p-2 rounded-md mt-3">
                            <input
                                type={inputpass ? "text" : "password"}
                                placeholder="password"
                                name="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
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

                        <button
                            type="submit"
                            className="EcommerceAdminLogin"
                            onClick={submitHandler}
                        >
                            {loading ? (
                                <Spinner size="lg" animation="border" role="status" />
                            ) : (
                                "Register"
                            )}
                        </button>
                        <br />
                        <Link to="/admin-login">
                            <button type="button" className="EcommerceAdminLogin">
                                Admin Panel
                            </button>
                        </Link>
                        <p style={{ textAlign: "right" }}>Register New Vender</p>
                    </section>
                </form>
            </div>
        </>
    );
};

export default RegisterNewVender;

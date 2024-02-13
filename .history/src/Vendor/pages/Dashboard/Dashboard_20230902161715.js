/** @format */

import HOC from "../../layout/HOC";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [productCount, setProductCount] = useState(0);
  

  const token = localStorage.getItem("token");

  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `https://ecommerce-backend-ochre-phi.vercel.app/api/v1/vendor/Product/list?page=1&limit=10&search=&toDate=null&fromDate=null&categoryId=&subcategoryId=`,
        Auth
      );
      setProductCount(res.data.data.total);
    } catch {}
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const card = [
    {
      progress: "bg-green-400",
      title: "All Product",
      number: productCount,
      icon: (
        <i className="fa-solid fa-cart-shopping text-2xl text-[#3c335d]"></i>
      ),
      bg: "#3c335d",
      link: "/Product",
    },
  ];
  return (
    <>
      <section className="grid md:grid-cols-4 grid-cols-2 gap-y-6 gap-x-4">
        {card.map((card, index) => {
          return (
            <div
              className="px-5 py-8 bg-slate-200 space-y-2 shadow-xl flex flex-col  rounded-md cardDiv"
              key={index}
              style={{
                backgroundColor: `${card.bg}`,
                textTransform: "uppercase",
              }}
              onClick={() => navigate(`${card.link}`)}
            >
              <div className="grid  justify-between grid-cols-4">
                <div className="flex flex-col col-span-3 space-y-1">
                  <span
                    className="tracking-widest text-gray-900"
                    style={{ color: "#fff" }}
                  >
                    {card.title}
                  </span>
                  <span
                    className="tracking-wider text-gray-700 text-xl md:text-2xl font-semibold"
                    style={{ color: "#fff" }}
                  >
                    {card.number}
                  </span>
                </div>
                <div className="flex rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-white justify-center items-center iCOn">
                  {card.icon}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default HOC(Dashboard);

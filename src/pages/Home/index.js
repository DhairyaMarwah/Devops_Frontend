import React, { useState } from "react";
import axios from "axios";
import Amazon from "../../assets/amazon.svg";
import Flipkart from "../../assets/flipkart.svg";
import Info from "../../assets/info.svg";
import Img from "../../assets/img.png";

import { motion } from "framer-motion";

const Home = () => {
  // const data = [
  //   {
  //     company: "Flipkart",
  //     link: "https://www.flipkart.com/techfire-t20-60-hours-playing-time-fast-charging-bluetooth-neckband-earphone-headset/p/itmdbb716f94c761?pid=ACCGHVHYWZAWRGFH&lid=LSTACCGHVHYWZAWRGFHJMFXAT&marketplace=FLIPKART&q=headphones&store=0pm%2Ffcn&srno=s_1_1&otracker=search&otracker1=search&fm=organic&iid=en_Q4GrSpsmvsWcA6ar89BSLlSsk98%2F5yLGSIGR81HMzePnWLU65YS4BUr3jMLeIOV19On6yBRFg3qsB87Tik8SgA%3D%3D&ppt=hp&ppn=homepage&ssid=ydola18c3k0000001681163008951&qH=edd443896ef5dbfc",
  //     price: 398,
  //     product_image: null,
  //     product_name:
  //       "TECHFIRE T20 60 Hours Playing Time Fast Charging Blueto...",
  //   },
  //   {
  //     company: "Amazon",
  //     link: "https://www.amazon.in/sspa/click?ie=UTF8&spc=MTo0NzQ5NTc1NDg4MjgyOTAyOjE2ODExNjMwMjE6c3BfYXRmOjIwMTQyMTg1ODU4ODk4OjowOjo&url=%2FSennheiser-GSP-600-Professional-Headset%2Fdp%2FB078VM929R%2Fref%3Dsr_1_2_sspa%3Fkeywords%3Dheadphones%26qid%3D1681163021%26sr%3D8-2-spons%26sp_csd%3Dd2lkZ2V0TmFtZT1zcF9hdGY%26psc%3D1",
  //     price: 9990,
  //     product_image:
  //       "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T2/images/I/51rpbVmi9XL._AC_UY218_.jpg",
  //     product_name:
  //       "Sony WH-CH720N, Wireless Over-Ear Active Noise Cancellation Headphones with Mic, up to 50 Hours Playtime, Multi-Point Connection, App Support, AUX & Voice Assistant Support for Mobile Phones (Black)",
  //   },
  // ];
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(-1);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://127.0.0.1:5000/search",
        { data: { query: searchQuery } },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => setResults(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="app">
      <div className="absolute-img">
        <img src={Img} alt="" />
      </div>
      <h1>
        ShopperEase:Find the Best Deals Across Multiple <br /> Websites with
        Ease
      </h1>
      <div className="search-box">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for different products.."
          />
          <p
            onClick={() => {
              setSearchQuery("");
            }}
          >
            Close
          </p>
        </form>
      </div>
      {results.length > 0 && (
        <>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="search-results"
          >
            <p>Search Results for : {searchQuery}</p>
            <div className="companies">
              {results.map((result, index) => {
                return (
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: index * 0.25 }}
                    className="company"
                    key={index}
                  >
                    {open === index && (
                      <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="company-info-box"
                      >
                        <span
                          className="close"
                          onClick={() => {
                            setOpen(-1);
                          }}
                        >
                          Close
                        </span>
                        <img src={result.product_image} alt="" />
                        <div className="result-product-title">
                          {result.product_name.slice(0, 80)}...
                        </div>
                        <div className="result-product-price">
                          ₹{result.price}
                        </div>
                        <div className="result-product-button">
                          <button>
                            <a href={`${result.link}`}> Visit</a>
                          </button>
                        </div>
                      </motion.div>
                    )}

                    <div className="company-name">
                      <img
                        src={result.company === "Amazon" ? Amazon : Flipkart}
                        alt="company-logo"
                      />
                      <div className="company-name-flex">
                        <h1>{result.company}</h1>
                        <p>₹{result.price}</p>
                      </div>
                    </div>
                    <div className="company-info">
                      <img
                        onClick={() => {
                          setOpen(index);
                        }}
                        src={Info}
                        alt=""
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Home;

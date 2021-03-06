import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import "./DataLoad.css";
import { fetchToken } from "../../redux";
import { Link } from "react-router-dom";
import DotRing from "../DotRing/DotRing";
import { MouseContext } from "../../context/mouse-context";

const DataLoad = (props) => {
  const { cursorChangeHandler } = useContext(MouseContext);
  const loader = useSelector((state) => state.userToken.loading);
  const accessToken = useSelector((state) => state.userToken.data[0]);
  const userData = useSelector((state) => state.userToken.data[1]);
  const userDataId = useSelector((state) => state.userToken.data[2]);


  

  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.removeItem("token")
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");

    dispatch(fetchToken(code));
  }, []);

  localStorage.setItem("token", accessToken);
  localStorage.setItem("userId", userDataId);

  const location = useLocation();

  return (
    <div>
      <DotRing />
      <div
        onMouseEnter={() => cursorChangeHandler("hovered")}
        onMouseLeave={() => cursorChangeHandler("")}
      >
        <div className="playDiv">
          {" "}
          {loader ? (
            <div className="playCircle">
              <div class="lds-circle">
                <div></div>
              </div>
            </div>
          ) : (
            <div className="playCircleActing">
              <Link to="/home">
                <i className="fas play fa-play"></i>
              </Link>
            </div>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default DataLoad;

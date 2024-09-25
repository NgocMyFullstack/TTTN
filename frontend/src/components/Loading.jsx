import React from "react";
import Spinner from "react-bootstrap/Spinner";
// import ClockLoader from "react-spinners/ClockLoader";
import { ClockLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {/* <Spinner animation="border" variant="primary" />
      <Spinner animation="border" variant="danger" />
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner> */}

      <ClockLoader size={400} color="#36d7b7" />
      <p style={{ fontSize: "100px" }}>Loatding..99%</p>
    </div>
  );
}

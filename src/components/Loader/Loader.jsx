import React from "react";
import { GridLoader } from "react-spinners";
export default function Loader() {
  return (
    <>
      <div className="loader position-fixed top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center z-3 bg-white">
      <GridLoader color="rgb(81, 164, 81)"  size={25} />
      </div>
    </>
  );
}

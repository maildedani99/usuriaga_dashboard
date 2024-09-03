// components/Spinner.js

import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Spinner = ({size = 80}) => (
  <div className="flex">
    <div className=" mx-auto ">
      <ThreeDots
        height={size}
        width={size}
        color="#dac895"
        secondaryColor="#f3f3f3"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  </div>
);

export default Spinner;

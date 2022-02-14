import React from "react";
import { Link } from "react-router-dom";

const Dashboard = (props) => {

  return (
    <div>
      {props.loggedInStatus}
    </div>
   
  );
};

export default Dashboard;


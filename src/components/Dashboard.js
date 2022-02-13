import React from 'react';
import {Link} from 'react-router-dom'

const Dashboard = (props) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Status: {props.loggedInStatus}</h2>
    <Link to="/">Home</Link>
    </div>
  )
}

export default Dashboard;

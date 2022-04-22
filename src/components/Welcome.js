import React from 'react';
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <>
      <style type="text/css">
        {`.navbar {display: none}`}
      </style>

      <section className="hero is-dark is-fullheight">

        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-6 is-offset-3">
              <h1 className="title">
                Welcome!
              </h1>

              <div>
                <p>Each game consists of five questions, chosen at random.</p>
                <p>You will have 20 seconds to answer, so take your best guess.</p>
              </div>
              <div className="mt-5 mb-5">
                <p>At the end, you will see how well you did, and your record will be saved.</p>
              </div>
              <button className="button is-white"><Link to="/dashboard">OK</Link></button>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}

export default Welcome;

import React, { useContext } from "react";
import Dashboard from "./Dashboard";
import { render } from '../test-utils'
import { BrowserRouter } from "react-router-dom";

test("render Dashboard", async () => {

  return render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
});

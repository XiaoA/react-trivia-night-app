import React from "react";
import { render, screen } from '../test-utils'
import Home from "./Home";
import { BrowserRouter } from 'react-router-dom';

test("renders Home component", async() => {
  return render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
});

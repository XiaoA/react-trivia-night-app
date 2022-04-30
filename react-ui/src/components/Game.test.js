import React, { useContext } from "react";
import Game from "./Game";
import { render, screen } from '../test-utils'
import { BrowserRouter } from 'react-router-dom';


test("render Game", async () => {
  return render(
    <BrowserRouter>
      <Game />
    </BrowserRouter>
  );
});


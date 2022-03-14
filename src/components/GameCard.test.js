import React from "react";
import GameCard from "./GameCard";
import { render, screen } from '../test-utils'
import { BrowserRouter } from 'react-router-dom';

test("render GameCard", async () => {
  return render(
    <BrowserRouter>
      <GameCard />
    </BrowserRouter>
  );
});


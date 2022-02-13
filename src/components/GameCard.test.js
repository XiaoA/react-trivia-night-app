import React from "react";
import GameCard from "./GameCard";
import { render, screen } from '../test-utils'

test("render GameCard", async () => {
  return render(
    <GameCard />
  );
});


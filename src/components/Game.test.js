import React, { useContext } from "react";
import Game from "./Game";
import { render, screen } from '../test-utils'

test("render Game", async () => {
  return render(
    <Game />
  );
});

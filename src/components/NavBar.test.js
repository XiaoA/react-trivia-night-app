import React from "react";
import { render, screen } from '../test-utils'
import NavBar from './NavBar';
import { BrowserRouter } from "react-router-dom";

describe('NavBar for unauthenticated user', () => {
  const links = [
    { text: 'Home', location: "/" },
    { text: 'Quick Game', location: "/game" },
  ];

  const setup = (component) => (
    render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    )
  )

  test.each(links)(
    "Check if Nav Bar have %s link.",
    (link) => {
      setup(<NavBar />);
      const linkDom = screen.getByText(link.text);
      expect(linkDom).toHaveAttribute("href", link.location);
    }
  );

  test('displays register button when logged out', () => {
    render(
      <BrowserRouter>
        <NavBar isLoggedIn={false} />
      </BrowserRouter>
    );

    const registerButton = screen.getByRole("button", { name: 'Register' });
    expect(registerButton).toBeInTheDocument();
  })

  test('displays login button when logged out', () => {
    render(
      <BrowserRouter>
        <NavBar isLoggedIn={false} />
      </BrowserRouter>
    );

    const loginButton = screen.getByRole("button", { name: 'Login' });
    expect(loginButton).toBeInTheDocument();
  })

  test("does not display logout button when logged out", () => {
    render(
      <BrowserRouter>
        <NavBar isLoggedIn={false} />
      </BrowserRouter>
    );

    const logoutButton = screen.queryByRole("button", { name: 'Log out' });
    expect(logoutButton).not.toBeInTheDocument();
  })
})


describe('NavBar for authenticated user', () => {
  const links = [
    { text: 'Quick Game', location: "/game" },
    { text: 'Custom Game', location: "/game-options" },
    { text: 'Dashboard', location: "/dashboard" }
  ];

  const setup = (component) => (
    render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    )
  )

  test.each(links)(
    "Check if Nav Bar have %s link.",
    (link) => {
      setup(<NavBar isLoggedIn={true} />);
      const linkDom = screen.getByText(link.text);
      expect(linkDom).toHaveAttribute("href", link.location);
    }
  );
  test('displays logout button when user is logged in', () => {
    render(
      <BrowserRouter>
        <NavBar isLoggedIn={true} />
      </BrowserRouter>
    );
    const logoutButton = screen.getByRole("button", { name: /Log out/i });
    expect(logoutButton).toBeInTheDocument();
  })

  test("does not display register button when user is logged in", () => {
    render(
      <BrowserRouter>
        <NavBar isLoggedIn={true} />
      </BrowserRouter>
    );

    const registerButton = screen.queryByRole("button", { name: 'Register' });
    expect(registerButton).not.toBeInTheDocument();
  })

  test("does not display login button when logged in", () => {
    render(
      <BrowserRouter>
        <NavBar isLoggedIn={true} />
      </BrowserRouter>
    );

    const loginButton = screen.queryByRole("button", { name: 'Login' });
    expect(loginButton).not.toBeInTheDocument();
  })
})

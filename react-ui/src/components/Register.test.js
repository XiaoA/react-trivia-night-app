import React from "react";
import { render, screen, mutationObserverMock, waitFor } from '../test-utils'
import userEvent from "@testing-library/user-event";

import Register from './Register';
import { BrowserRouter } from "react-router-dom";

const typeIntoForm = ({ email, password, confirmPassword, username }) => {
  const emailInputElement = screen.getByPlaceholderText("Your Email");
  const passwordInputElement = screen.getByPlaceholderText("Your Password");
  const confirmPasswordInputElement =
    screen.getByPlaceholderText(/confirm your password/i);
  const usernameInputElement =
    screen.getByPlaceholderText(/choose a unique username/i)

  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.type(passwordInputElement, password);
  }
  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }
  if (username) {
    userEvent.type(usernameInputElement, username);
  }

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
    usernameInputElement
  };
};

const clickOnSubmitButton = () => {
  const submitBtnElement = screen.getByRole("button", {
    name: /next step/i,
  });
  userEvent.click(submitBtnElement);
};

beforeEach(() => {
  render(
    <BrowserRouter >
      <Register />
    </BrowserRouter >
  );
})

test("inputs should be initially empty", () => {
  expect(screen.getByPlaceholderText(/your email/i).value).toBe("");
  expect(screen.getByPlaceholderText("Your Password").value).toBe("");
  expect(screen.getByPlaceholderText(/confirm your password/i).value).toBe("");
  expect(screen.getByPlaceholderText(/choose a unique username/i).value).toBe("");
});

test("should be able to type an email", () => {
  const { emailInputElement } = typeIntoForm({ email: "andrew@example.com" });
  expect(emailInputElement.value).toBe("andrew@example.com");
});

test("should be able to type a password", () => {
  const { passwordInputElement } = typeIntoForm({ password: "password!" });
  expect(passwordInputElement.value).toBe("password!");
});

test("should be able to type a confirm password", () => {
  const { confirmPasswordInputElement } = typeIntoForm({
    confirmPassword: "password!",
  });
  expect(confirmPasswordInputElement.value).toBe("password!");
});


test("should show email error message on invalid email", async () => {
  expect(
    screen.queryByText(/invalid email address/i)
  ).not.toBeInTheDocument();

  typeIntoForm({
    email: "andrew",
  });

  userEvent.tab();
  //  clickOnSubmitButton();

  expect(
    await screen.findByText("Invalid email address.")
  ).toBeInTheDocument();
});

test("should show password error if password is less than 8 characters", async () => {
  typeIntoForm({ email: "andrew@example.com" });

  expect(
    screen.queryByText(
      /password must be at least 8 characters/i
    )
  ).not.toBeInTheDocument();

  typeIntoForm({ password: "123" });

  userEvent.tab();

  expect(
    await screen.findByText(
      /password must be at least 8 characters/i
    )
  ).toBeInTheDocument();
});

test.skip("should show confirm password error if passwords don't match", async () => {
  typeIntoForm({
    email: "andrew@example.com",
    password: "12345",
  });

  expect(
    screen.queryByText(/the passwords don't match. try again/i)
  ).not.toBeInTheDocument();

  typeIntoForm({
    confirmPassword: "123456",
  });

  userEvent.tab();

  expect(
    await screen.findByText(/the passwords don't match. try again/i)
  ).toBeInTheDocument();
});

test("should show no error message if every input is valid", async () => {
  typeIntoForm({
    email: "andrew-test@example.com",
    password: "12345",
    confirmPassword: "12345",
    username: "andrew-test"
  });
  clickOnSubmitButton();

  await waitFor(() => {
    expect(
      screen.queryByText(/invalid email address/i)
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText(
        /password must be at least 8 characters/i
      )
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/the passwords don't match. try again/i)
    ).not.toBeInTheDocument();
  });
});

test("should require a valid username", async () => {
  typeIntoForm({
    email: "andrew-test@example.com",
    password: "password",
    confirmPassword: "password",
    username: ""
  });

  clickOnSubmitButton();

  expect(
    await screen.findByText(/you must select a unique username/i)
  ).toBeInTheDocument()
})


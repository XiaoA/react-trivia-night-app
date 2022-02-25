import React from "react";
import { render, screen, mutationObserverMock } from '../test-utils'
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

// test.todo("should display a blank form on page load")
//   test("inputs should be initially empty", () => {
//     expect(screen.getByLabelText(/email/i).value).toBe("");
//     expect(screen.getByLabelText("Password").value).toBe("");
//     expect(screen.getByLabelText(/confirm password/i).value).toBe("");
//     expect(screen.getByLabelText(/username/i).value).toBe("");
//   });

// test("should show no error if every input is valid", () => {

// })

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


test.skip("should show email error message on invalid email", () => {
  expect(
    screen.queryByText(/invalid email address/i)
  ).not.toBeInTheDocument();

  typeIntoForm({
    email: "andrew",
  });
  clickOnSubmitButton();

  expect(
    screen.queryByText(/invalid email address/i)
  ).toBeInTheDocument();
});

test.skip("should show password error if password is less than 5 characters", () => {
  typeIntoForm({ email: "andrew@example.com" });

  expect(
    screen.queryByText(
      /password must be at least 8 characters/i
    )
  ).not.toBeInTheDocument();

  typeIntoForm({ password: "123" });

  clickOnSubmitButton();

  expect(
    screen.queryByText(
      /password must be at least 8 characters/i
    )
  ).toBeInTheDocument();
});

test.skip("should show confirm password error if passwords don't match", () => {
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

  clickOnSubmitButton();

  expect(
    screen.queryByText(/the passwords don't match. try again/i)
  ).toBeInTheDocument();
});

test.skip("should show no error message if every input is valid", () => {
  typeIntoForm({
    email: "andrew@example.com",
    password: "12345",
    confirmPassword: "12345",
  });
  clickOnSubmitButton();

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

test.todo("should require a valid username")

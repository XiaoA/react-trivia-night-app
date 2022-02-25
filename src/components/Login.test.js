import React from "react";
import { render, screen, mutationObserverMock } from '../test-utils'
import userEvent from "@testing-library/user-event";
import Login from './Login';
import { BrowserRouter } from "react-router-dom";

const typeIntoForm = ({ email, password }) => {
  const emailInputElement = screen.getByPlaceholderText("Your Email");
  const passwordInputElement = screen.getByPlaceholderText("Your Password");

  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.type(passwordInputElement, password);
  }

  return {
    emailInputElement,
    passwordInputElement,
  };
};

const clickOnSubmitButton = () => {
  const submitBtnElement = screen.getByRole("button", {
    name: /login/i,
  });
  userEvent.click(submitBtnElement);
};

beforeEach(() => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
})

test("should be able to type an email", () => {
  const { emailInputElement } = typeIntoForm({ email: "andrew@example.com" });
  expect(emailInputElement.value).toBe("andrew@example.com");
});

test("should be able to type a password", () => {
  const { passwordInputElement } = typeIntoForm({ password: "password!" });
  expect(passwordInputElement.value).toBe("!drowssap");
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


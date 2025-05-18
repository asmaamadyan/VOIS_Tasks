import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter} from "react-router-dom";
import AuthForm from "./AuthForm";

describe("AuthForm Component", () => {
  test("renders login form by default", () => {
    render(
      <MemoryRouter initialEntries={["/auth?mode=login"]}>
        <AuthForm />
      </MemoryRouter>
    );

    // Check if the login heading is rendered
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();

    // Check if the email and password fields are present
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Check if the button says "Login"
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("renders signup form when mode is signup", () => {
    render(
      <MemoryRouter initialEntries={["/auth?mode=signup"]}>
        <AuthForm />
      </MemoryRouter>
    );

    // Check if the signup heading is rendered
    expect(
      screen.getByRole("heading", { name: /create a new user/i })
    ).toBeInTheDocument();

    // Check if the first name and last name fields are present
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();

    // Check if the email and password fields are present
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Check if the button says "Save"
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });
});
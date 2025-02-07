"use client";

import "../login/login.css";
import { useState } from "react";
import { Login1 } from "@/types/authorization";

export default function Login() {
  const [login, setLogin] = useState<Login1>({
    email: "",
    password: "",
  });

  async function handleSubmit() {
    try {
      await fetch("http://localhost:8000/api/v1/login", {
        method: "POST",
        body: JSON.stringify({
          email: login.email,
          password: login.password,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  }

  function clearForm() {
    setLogin({
      email: "",
      password: "",
    });
  }

  return (
    <>
      <form
        className="login-container space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
          clearForm();
          console.log("logged in");
        }}
      >
        <div className="login-box">
          <h2 className="login-title">Login</h2>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={login?.email}
              onChange={(e) =>
                setLogin((prev) => {
                  return { ...prev, email: e.target.value };
                })
              }
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={login?.password}
              onChange={(e) =>
                setLogin((prev) => {
                  return { ...prev, password: e.target.value };
                })
              }
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="signup-text">
            Don&apos;t have an account?{" "}
            <a href="/sign-up" className="signup-link">
              Sign up
            </a>
          </p>
        </div>
      </form>
    </>
  );
}

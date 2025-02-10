"use client";

import "../login/login.css";
import { useState } from "react";
import { Login1 } from "@/types/authorization";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [login, setLogin] = useState<Login1>({
    email: "",
    password: "",
  });

  function notify(message: string) {
    return toast(message);
  }

  async function handleSubmit() {
    try {
      const response = await fetch("http://localhost:8000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: login.email,
          password: login.password,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        return notify("Invalid credentials");
      }

      notify("login successfully");
      router.push("/");
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
      <ToastContainer />
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
          <button type="submit" className="login-button mt-4">
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

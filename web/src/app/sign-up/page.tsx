"use client";
import "../sign-up/sign-up.css";
import { useState, useEffect } from "react";
import { SignUp1 } from "@/types/authorization";

export default function SignUp() {
  const [signUp, setSignUp] = useState<SignUp1>({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    referral: "",
  });

  async function handleSubmit() {
    console.log(signUp);
    try {
      await fetch("http://localhost:8000/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: signUp?.fullname,
          email: signUp?.email,
          password: signUp?.password,
          confirmPassword: signUp?.confirmPassword,
          role: signUp?.role,
          referral: signUp?.referral,
        }),
      });
      console.log("Signup successful");
    } catch (error) {
      console.error(error);
    }
  }

  const [roles, setRoles] = useState<string[]>();
  useEffect(() => {
    async function fetchRoles() {
      try {
        const response = await fetch("http://localhost:8000/api/v1/getroles");
        const roles = await response.json();
        setRoles(roles.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    }
    fetchRoles();
  }, []);

  console.log(roles);

  function clearForm() {
    setSignUp({
      fullname: "",
      email: "",
      password: "",
      referral: "",
      confirmPassword: "",
      role: "",
    });
  }

  return (
    <>
      <div className="auth-container">
        <form
          className="auth-box space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            clearForm();
          }}
        >
          <h2 className="auth-title">Sign Up</h2>
          <div className="input-group">
            <label htmlFor="title">Full Name</label>
            <input
              id="title"
              type="text"
              value={signUp?.fullname}
              onChange={(e) =>
                setSignUp((prev) => {
                  return { ...prev, fullname: e.target.value };
                })
              }
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={signUp?.email}
              onChange={(e) =>
                setSignUp((prev) => {
                  return { ...prev, email: e.target.value };
                })
              }
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={signUp?.password}
              onChange={(e) =>
                setSignUp((prev) => {
                  return { ...prev, password: e.target.value };
                })
              }
              required
            />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={signUp?.confirmPassword}
              onChange={(e) =>
                setSignUp((prev) => {
                  return { ...prev, confirmPassword: e.target.value };
                })
              }
              required
            />
          </div>

          <div className="input-group">
            <label>Referral Code</label>
            <input
              type="ReferralCode"
              placeholder="Optional"
              value={signUp?.referral}
              onChange={(e) =>
                setSignUp((prev) => {
                  return { ...prev, referral: e.target.value };
                })
              }
            />
          </div>

          <div>
            <label htmlFor="role">Role</label>
            <br />
            <div className="w-fit m-auto">
              <select
                name="role"
                id="role"
                className="p-2 border rounded"
                value={signUp.role}
                onChange={(e) =>
                  setSignUp((prev) => ({ ...prev, role: e.target.value }))
                }
                required
              >
                {roles?.map((role, index: number) => {
                  return <option key={index}>{role}</option>;
                })}
              </select>
            </div>
          </div>

          <button type="submit" className="auth-button">
            Sign Up
          </button>
          <p className="switch-text">
            Already have an account?{" "}
            <a href="/login" className="switch-link">
              Login
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

// name: arifin,
// email: arifin@test.com
// password: 123456
// role: ORGANIZER

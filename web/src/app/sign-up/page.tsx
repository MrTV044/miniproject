"use client";
import "../sign-up/sign-up.css";
import { useState } from "react";
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
            <label>Role</label>
            <br />
            <div className="w-fit m-auto">
              <input
                name="role"
                className="mr-2"
                id="organizer"
                type="radio"
                checked={signUp.role === "ORGANIZER"}
                value="ORGANIZER"
                onChange={(e) =>
                  setSignUp((prev) => {
                    return { ...prev, role: e.target.value };
                  })
                }
                required
              />
              <label htmlFor="organizer">Organizer</label>
              <input
                name="role"
                id="customer"
                className="ml-20 mr-2"
                type="radio"
                value="CUSTOMER"
                checked={signUp.role === "CUSTOMER"}
                onChange={(e) =>
                  setSignUp((prev) => {
                    return { ...prev, role: e.target.value };
                  })
                }
                required
              />
              <label htmlFor="customer">User</label>
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

"use client";
import "../sign-up/sign-up.css";
import { useState, useEffect } from "react";
import { SignUp1 } from "@/types/authorization";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [signUp, setSignUp] = useState<SignUp1>({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    referral: "",
  });

  // make function to hit Coupon API when user is referral code is valid

  async function postCoupon(id: string) {
    console.log(id);
    try {
      const date = new Date();

      // const response3 = await fetch("http://localhost:8000/api/v1/register");
      // const responseId = await response3.json();

      const response1 = await fetch("http://localhost:8000/api/v1/postCoupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: `${date.getTime()}`,
          expirationDate: new Date(date.setMonth(date.getMonth() + 3)),
          discount: 20000,
          userId: id,
        }),
      });

      if (!response1.ok) {
        console.error("Coupon API failed");
        return;
      }

      const couponData = await response1.json();
      console.log("Generated Coupon:", couponData);

      console.log("Coupon successfully assigned to user.");
    } catch (error) {
      console.error("Error in postCoupon:", error);
    }
  }

  function notify(message: string) {
    return toast(message);
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

  async function handleSubmit() {
    console.log(signUp);
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/api/v1/register", {
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
      const parsedResponse = await response.json();

      if (!response.ok) {
        return notify("Sign up failed");
      }
      postCoupon(parsedResponse.data);
      // clearForm();
      notify("Signup successful!");
      // router.push("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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

  return (
    <>
      <ToastContainer />
      <div className="auth-container">
        <form
          className="auth-box space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
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
                defaultValue=""
                value={signUp.role}
                onChange={(e) =>
                  setSignUp((prev) => ({ ...prev, role: e.target.value }))
                }
                required
              >
                <option value="">Pick a Role</option>
                {roles?.map((role, index: number) => {
                  return (
                    <option key={index} value={role}>
                      {role.toLowerCase()}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className={`${
              isLoading
                ? "border-gray-500 text-gray-500"
                : "border-white text-white"
            } border  mt-2 mb-4 auth-button`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
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

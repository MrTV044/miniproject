import "../sign-up/sign-up.css";

export default function SignUp() {
  return (
    <>
      <div className="auth-container">
        <div className="auth-box">
          <h2 className="auth-title">Sign Up</h2>
          <form className="space-y-4">
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" required />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input type="email" required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input required />
            </div>
            <div className="input-group">
              <label>Confirm Password</label>
              <input required />
            </div>
            <button type="submit" className="auth-button">
              Sign Up
            </button>
          </form>
          <p className="switch-text">
            Already have an account?{" "}
            <a href="/login" className="switch-link">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

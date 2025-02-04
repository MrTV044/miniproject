import "../login/login.css"; // Import the global styles

export default function Login() {
  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Login</h2>
          <form className="space-y-4">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <p className="signup-text">
            Don&apos;t have an account?{" "}
            <a href="/sign-up" className="signup-link">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

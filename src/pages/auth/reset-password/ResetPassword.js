import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import BgImg from "../../../assets/images/background.jpg";
import "./ResetPassword.scss";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading] = useState(false);

  return (
    <div className="container-wrapper" style={{ backgroundImage: `url(${BgImg})` }}>
      <div className="environment">DEV</div>
      <div className="container-wrapper-auth">
        <div className="tabs reset-password-tabs">
          <div className="tabs-auth">
            <ul className="tab-group">
              <li className="tab">
                <div className="login reset-password">Reset Password</div>
              </li>
            </ul>
            <div className="tab-item">
              <div className="auth-inner">
                <form className="reset-password-form">
                  <div className="form-input-container">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      labelText="New Password"
                      placeholder="New Password"
                      handleChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                      id="cpassword"
                      name="cpassword"
                      type="password"
                      value={confirmPassword}
                      labelText="Confirm Password"
                      placeholder="Confirm Password"
                      handleChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <Button
                    label={`${loading ? "RESET PASSWORD IN PROGRESS..." : "RESET PASSWORD"}`}
                    className="auth-button button"
                    disabled={!password || !confirmPassword}
                  />

                  <Link to={"/"}>
                    <span className="login">
                      <FaArrowLeft className="arrow-left" /> Back to Login
                    </span>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

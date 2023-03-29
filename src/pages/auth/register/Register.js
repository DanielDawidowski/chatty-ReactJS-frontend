import { useState, useEffect } from "react";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import { authService } from "../../../services/api/auth/auth.service";
import { Utils } from "../../../services/utils/utils.service";
import "./Register.scss";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [hasError, setHasError] = useState(false);
  const [user] = useState();

  const registerUser = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const avatarColor = Utils.avatarColor();
      const avatarImage = Utils.generateAvatar(username.charAt(0).toUpperCase(), avatarColor);
      const result = await authService.signUp({
        username,
        email,
        password,
        avatarColor,
        avatarImage
      });
      setHasError(false);
      setAlertType("alert-success");
      console.log(result);
      // return result;
    } catch (error) {
      setLoading(false);
      setHasError(true);
      setAlertType("alert-error");
      setErrorMessage(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (loading && !user) return;
    if (user) console.log("redirect to page");
    setLoading(false);
  }, [loading, user]);

  return (
    <div className="auth-inner">
      {hasError && errorMessage && (
        <div className={`alerts ${alertType}`} role="alert">
          {errorMessage}
        </div>
      )}
      <form className="auth-form" onSubmit={registerUser}>
        <div className="form-input-container">
          <Input
            id="username"
            name="username"
            type="text"
            value={username}
            labelText="Username"
            placeholder="Enter Username"
            handleChange={(event) => setUsername(event.target.value)}
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          />
          <Input
            id="email"
            name="email"
            type="text"
            value={email}
            labelText="Email"
            placeholder="Enter Email"
            handleChange={(event) => setEmail(event.target.value)}
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          />
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            labelText="Password"
            placeholder="Enter Password"
            handleChange={(event) => setPassword(event.target.value)}
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          />
        </div>
        <Button
          label={`${loading ? "SIGNUP IN PROGRESS..." : "SIGNUP"}`}
          className="auth-button button"
          disabled={!username || !email || !password}
        />
      </form>
    </div>
  );
};

export default Register;

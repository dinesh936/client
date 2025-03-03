import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Import external CSS file

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [name, email, password]);

  const validateForm = () => {
    if (name.trim() !== "" && email.trim() !== "" && password.length >= 8) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      alert("Please enter valid values! Password must be at least 8 characters.");
      return;
    }

    try {
      const response = await axios.post("https://server-605x.onrender.com/create", {
        name,
        email,
        password,
        amount: 0,
      });
      console.log("Response:", response.data);
      setSubmitted(true);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed!");
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-heading">Create Your Account</h1>
      {!submitted ? (
        <Form className="register-form" onSubmit={handleSubmit}>
          <Form.Group className="form-group">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button className="submit-btn" variant="primary" type="submit" disabled={!isValid}>
            Sign Up
          </Button>
        </Form>
      ) : (
        <div className="success-message">
          <h3>Account Created Successfully! 🎉</h3>
          <Button className="reset-btn" onClick={() => setSubmitted(false)}>
            Add Another Account
          </Button>
        </div>
      )}
    </div>
  );
}

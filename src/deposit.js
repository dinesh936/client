import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Import external CSS file

export default function Deposit() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [deposit, setDeposit] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [email, password, deposit]);

  // Validate form inputs
  const validateForm = () => {
    if (!email.trim() || !password.trim() || isNaN(deposit) || deposit <= 0) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const depositAmount = parseFloat(deposit);

    if (isNaN(depositAmount) || depositAmount <= 0) {
      setErrorMessage("Invalid deposit amount.");
      return;
    }

    try {
      const response = await axios.post("https://server-605x.onrender.com/data/deposit", {
        email,
        password,
        amount: depositAmount,
      });

      setSuccessMessage(`Successfully deposited $${depositAmount}. New balance: $${response.data.newBalance}`);
      setDeposit("");
      setIsValid(false);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Deposit failed. Please try again.");
    }
  };

  return (
    <div className="deposit-container">
      <h1 className="deposit-heading">Deposit Amount</h1>

      {successMessage && <div className="alert alert-success fade-in">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger fade-in">{errorMessage}</div>}

      <Form className="deposit-form" onSubmit={handleSubmit}>
        <Form.Group className="form-group">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter deposit amount"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
          />
        </Form.Group>

        <Button className="submit-btn" variant="success" type="submit" disabled={!isValid}>
          Deposit
        </Button>
      </Form>
    </div>
  );
}

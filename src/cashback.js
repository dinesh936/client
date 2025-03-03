import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css"; // Import new CSS file

export default function Withdraw() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    if (!email.trim() || !password.trim() || isNaN(withdrawAmount) || withdrawAmount <= 0) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const amountToWithdraw = parseFloat(withdrawAmount);

    if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
      setErrorMessage("Please enter a valid withdrawal amount.");
      return;
    }

    try {
      const response = await axios.post("https://server-605x.onrender.com//data/withdraw", {
        email,
        password,
        amount: amountToWithdraw,
      });

      setSuccessMessage(`Successfully withdrawn $${amountToWithdraw}. New balance: $${response.data.newBalance}`);
      setWithdrawAmount("");
      setIsValid(false);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Withdrawal failed. Please try again.");
    }
  };

  return (
    <div className="background">
      <div className="withdraw-container">
        <h1 className="withdraw-heading">Withdraw Amount</h1>

        {successMessage && <div className="alert alert-success fade-in">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger fade-in">{errorMessage}</div>}

        <Form className="withdraw-form" onSubmit={handleSubmit}>
          <Form.Group className="form-group">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateForm();
              }}
            />
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validateForm();
              }}
            />
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter withdrawal amount"
              value={withdrawAmount}
              onChange={(e) => {
                setWithdrawAmount(e.target.value);
                validateForm();
              }}
            />
          </Form.Group>

          <Button className="submit-btn" variant="danger" type="submit" disabled={!isValid}>
            Withdraw
          </Button>
        </Form>
      </div>
    </div>
  );
}

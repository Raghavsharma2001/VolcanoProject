import React, { Component } from "react";
import { useState } from "react";
import { Alert, Form, FormGroup, Label, Input, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import "./registration.css";

const API_Url = "http://sefdb02.qut.edu.au:3001";
const emailpattern = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState("");
  const navigate = useNavigate();

  const useRegistration = () => {
    const url = `${API_Url}/user/register`;
    fetch(url, {
      method: "Post",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if ("error" in res) {
          setError(res.message);
          console.log(res.error);
          console.log(res.message);
          setError(res.message);
          setColor("danger");
          setIsOpen(true);
        } else {
          console.log(res.message);
          setError(res.message);
          setColor("success");
          setIsOpen(true);
        }
      });

    const errorMessage = () => {
      return (
        <div>
          <Alert color="dark" isOpen={true}>
            This is message
            {error}
          </Alert>
        </div>
      );
    };
  };

  return (
    <div>
      <div>
        {" "}
        <Alert color={color} isOpen={isOpen}>
          {error}
        </Alert>
      </div>

      <div className="registration-setup">
        <div className="registration">
          <h1 className="text"> Sign Up</h1>

          <div className="input-container">
            <Form>
              <FormGroup className="flex">
                <Label for="Email" color={"black"} className="label-text">
                  Email
                </Label>
                <Col>
                  <Input
                    id="Email"
                    name="email"
                    placeholder="examplel@email.com"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Col>
                  <Input
                    id="examplePassword"
                    name="password"
                    placeholder="********"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Col>
              </FormGroup>
              <Col>
                <Button onClick={useRegistration} className="submit-button">
                  Submit
                </Button>
              </Col>
            </Form>
            <div className="or-text">OR</div>

            <div className="link">
              Already got an account? Login{" "}
              <Link exact to="/login">
                Here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useContext } from "react";
import { Alert, Form, FormGroup, Label, Input, Col, Button } from "reactstrap";
import "../Login/login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

import AuthContext from "../../store/auth-context";
const API_Url = "http://sefdb02.qut.edu.au:3001";

export default function Login() {
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState("");
  const [volcanoData, setVolcanoData] = useState({});

  const navigate = useNavigate();

  const useLogin = () => {
    const url = `${API_Url}/user/login`;
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
          console.log("error caught");
          console.log(res.message);
          setError(res.message);
          setColor("danger");
          setIsOpen(true);
        } else {
          authCtx.login(res.token);
          console.log(res.token);
          console.log(res);
          setError(res.message);
          setColor("success");
          navigate("/");
        }
      });
  };

  const getVolcanoData = function () {
    const url = `${API_Url}/volcano/4`;

    fetch(url)
      .then((res) => res.json())
      .then((res) => setVolcanoData(res));
  };

  return (
    <div>
      <div>
        {" "}
        <Alert color={color} isOpen={isOpen}>
          {error}
        </Alert>
      </div>

      <div className="login-setup">
        <div className="login">
          <h1 className="text"> Log In</h1>

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
                <Button onClick={useLogin} className="submit-button">
                  Submit
                </Button>
              </Col>
            </Form>
            <div className="or-text">OR</div>

            <div className="link">
              Don't have an account? Register{" "}
              <Link exact to="/register">
                Here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

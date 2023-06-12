import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import GoogleAuth from "./googleAuth";

import { RiLoginBoxLine } from "react-icons/ri";

import styles from "./styles/SignIn.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import facebook from "./assets/images/facebook.png";
import github from "./assets/images/github.png";
import google from "./assets/images/google.png";

import asideImage from "./assets/login.jpg";

function SignIn() {
  const Google_ = () => {
    window.open("http://localhost:5000/auth/google", "_self")
  }

  const Github_ = () => {
    window.open("http://localhost:5000/auth/github", "_self")
  }

  const Facebook_ = () => {
    window.open("http://localhost:5000/auth/facebook", "_self")
  }
  const [resData, setResData] = useState(null);
  async function postSignInInfoWithGoogle(inputData) {
    let datas = {
      email: inputData.user.email,
      password: "PAF2023@@",
    };
    const response = await axios({
      method: "post",
      url: "/api/v1/users/signin",
      data: datas
    });

    if (response.data !== null && response.data.status === "fail") {
      showWarningToast(response.data.message);
    }

    if (response.data !== null && response.data.status === "success") {
      setResData(response.data);

      localStorage.setItem("psnUserId", response.data.payload.user.id);
      localStorage.setItem("psnUserFirstName", response.data.payload.user.firstName);
      localStorage.setItem("psnUserLastName", response.data.payload.user.lastName);
      localStorage.setItem("psnUserEmail", response.data.payload.user.email);

      localStorage.setItem("psnToken", response.data.payload.token);
      navigate("/newsfeed");
    }

  }
  const handleAuth = (data) => {
    postSignInInfoWithGoogle(data)
    // console.log(data,"from sign in");
  }
  let navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  async function postSignInInfo(inputData) {
    const response = await axios({
      method: "post",
      url: "/api/v1/users/signin",
      data: {
        email: inputData.email,
        password: inputData.password,
      },
    });

    if (response.data !== null && response.data.status === "fail") {
      showWarningToast(response.data.message);
    }

    if (response.data !== null && response.data.status === "success") {
      setResData(response.data);

      localStorage.setItem("psnUserId", response.data.payload.user.id);
      localStorage.setItem("psnUserFirstName", response.data.payload.user.firstName);
      localStorage.setItem("psnBio", response.data.payload.user.bio);
      localStorage.setItem("psnUserLastName", response.data.payload.user.lastName);
      localStorage.setItem("psnUserEmail", response.data.payload.user.email);

      localStorage.setItem("psnToken", response.data.payload.token);
      navigate("/newsfeed");
    }

  }

  function showWarningToast(inputMessage) {
    toast.warn("Invalid email or password", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    console.log("toast");
  }

  return (
    <div className="login">
      <h1 className="loginTitle">Signin</h1>
      <br/>
      <div className="wrapper">
        <div className="left">
          <GoogleAuth handleAuth={handleAuth} />
          <div className="loginButton facebook" onClick={Facebook_}>
            <img src={facebook} alt="" className="icon" />
            Facebook
          </div>
          <div className="loginButton github" onClick={Github_}>
            <img src={github} alt="" className="icon" />
            Github
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          <Formik
            validationSchema={schema}
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              postSignInInfo(values);
              setSubmitting(false);
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isInValid,
              errors,
            }) => (
              <Form
                noValidate
                onSubmit={handleSubmit}
                className={styles.formContainer}
              >
                <Row >
                  <Form.Group as={Col} md="12" controlId="signInEmail">
                    <Form.Label style={{ color: "#000" }}>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={touched.email && errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid email
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12" controlId="signInPassword">
                    <Form.Label style={{ color: "#000" }}> Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={touched.password && errors.password}
                    />

                    <Form.Control.Feedback type="invalid">
                      Please enter your password
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Button type="submit" variant="success" className="btn-success" style={{ backgroundColor: "#3d85c6" }}>
                  Sign In <RiLoginBoxLine />
                </Button>
                <br />
                <div style={{ color: "#000", textAlign: "center" }} >

                  <p>You have no account <Link to='/signup' style={{ color: "#000" }} >Signup</Link></p>
                </div>

              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import asideImage from "./assets/signup.jpg";

import facebook from "./assets/images/facebook.png";
import github from "./assets/images/github.png";
import { BsFillPersonPlusFill } from "react-icons/bs";

import styles from "./styles/SignUp.module.css";
import Container from "react-bootstrap/esm/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "./googleAuth";

function SignUp() {
  const Github_ = () => {
    window.open("http://localhost:5000/auth/github", "_self")
  }

  const Facebook_ = () => {
    window.open("http://localhost:5000/auth/facebook", "_self")
  }
  const [userRole, setUserRole] = useState("user");
  const [resData, setResData] = useState(null);

  let navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
  });

  async function postSignUpInfo(inputData) {
    console.log(inputData)
    const response = await axios({
      method: "post",
      url: "/api/v1/users/save",
      data: {
        firstName: inputData.firstName,
        lastName: inputData.lastName,
        email: inputData.email,
        password: inputData.password,
        role: userRole,
      },
    });

    if (response.data !== null) {
      setResData(response.data);
    }

    if (response.data !== null && response.data.status === "fail") {
      showWarningToast(response.data.message);
    }

    if (response.data !== null && response.data.status === "success") {
      navigate("/signin");
    }

  }

  function showWarningToast(inputMessage) {
    toast.warn(inputMessage, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  async function postSignUpInfoWithGoogle(inputData) {
    console.log(inputData.user, "user");
    let displayName = []
    displayName = inputData.user ? inputData.user.displayName : "first name";
    let firstName = displayName
    let lastName = " "

    let datas = {
      firstName: firstName,
      lastName: lastName,
      email: inputData.user.email,
      password: "PAF2023@@",
      role: userRole,
    }
    console.log(datas, "datass");
    const response = await axios({
      method: "post",
      url: "/api/v1/users/save",
      data: datas,
    });

    if (response.data !== null) {
      setResData(response.data);
    }

    if (response.data !== null && response.data.status === "fail") {
      showWarningToast(response.data.message);
    }

    if (response.data !== null && response.data.status === "success") {
      navigate("/signin");
    }

  }
  const handleAuth = (data) => {
    postSignUpInfoWithGoogle(data)
    // console.log(data,"from sign in");
  }
  return (
    <div className="login">
      <h1 className="loginTitle">Signup</h1>
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
          firstName: "",
          lastName: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          // console.log(values);
          postSignUpInfo(values);
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
            <Row className="mb-1Í">
              <Form.Group as={Col} md="12" controlId="signInFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  isInvalid={touched.firstName && errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your first name
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-1Í">
              <Form.Group as={Col} md="12" controlId="signInLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  isInvalid={touched.lastName && errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your last name
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-1Í">
              <Form.Group as={Col} md="12" controlId="signInEmail">
                <Form.Label>Email</Form.Label>
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
            <Row className="mb-1Í">
              <Form.Group as={Col} md="12" controlId="signInPassword">
                <Form.Label>Password</Form.Label>
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
            <Button type="submit" variant="success" style={{ backgroundColor: "#3d85c6" }}>
              Sign Up <BsFillPersonPlusFill />
            </Button>
            <div style={{color:"#000",textAlign:"center"}} >
            <p>You have an account <Link to='/signin' style={{color:"#000"}} >Signin</Link></p>
            </div>
          </Form>
        )}
      </Formik>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

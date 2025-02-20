import { useState } from "react";
import Heading from "../components/Heading";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import FormField from "../components/FormField";
import { Link, useNavigate } from "react-router-dom";
import ToastMessage from "../components/ToastMessage";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  const triggerToast = () => {
    setShowToast(true);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .matches(
        /^(?![-_.0-9])[A-Za-z0-9!#$%&'*+/=?^_`{|}~](\.?[A-Za-z0-9!#$%&'*+/=?^_`{|}~]){0,64}@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,255}$/,
        "Invalid Email"
      ),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:5001/login", values);
      console.log(response);
      localStorage.setItem("jwt_token", response?.data?.jwtToken);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message);
      triggerToast();
    }
  };

  const handleDummyDataFill = (setValues) => {
    setValues({
      email: "test@gmail.com",
      password: "dummyPassword123",
    });
  };

  return (
    <div className="h-[90vh] flex justify-center items-center">
      <div className="h-[500px] w-[600px] flex flex-col p-8 border-2 border-[#0e0952] rounded-[20px]">
        <div className="flex justify-center">
          <Heading name="Login" />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setValues }) => (
            <Form className="space-y-4 mt-8">
              <FormField
                name="email"
                type="email"
                label="Email Address"
                placeholder="Enter your Email"
              />

              <FormField
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
              />

              <p className="text-blue-500 underline cursor-pointer">
                Forgot Password?
              </p>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="w-[100px] bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => handleDummyDataFill(setValues)}
                  className="w-[300px] bg-[#663c3c] text-white p-2 rounded hover:bg-[#7a0505] cursor-pointer"
                >
                  Fill Dummy Credentials
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-[40px]">
          <p>
            Don&apos;t have an account?{" "}
            <Link to="/signup">
              <span className="text-blue-500 underline cursor-pointer">
                Signup
              </span>
            </Link>
          </p>
        </div>
      </div>
      {showToast && (
        <ToastMessage message={error} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
};

export default LoginPage;

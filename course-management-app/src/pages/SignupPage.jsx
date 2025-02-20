import { FaArrowLeft } from "react-icons/fa";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Heading from "../components/Heading";
import FormField from "../components/FormField";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("Firstname is required"),
  lastname: Yup.string().required("Lastname is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const SignupPage = () => {
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate()

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const { firstname, lastname, email, password } = values;

      const response = await axios.post("http://localhost:5001/signup", {
        firstname,
        lastname,
        email,
        password,
      });

      console.log(response.data);
      navigate("/login")
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Signup failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-[90vh] flex justify-center items-center">
      <div className="w-[600px] border-1 border-[#0e0952] p-8 rounded-[20px]">
        <div className="flex justify-center mb-[20px]">
          <Heading name="SignUp" />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormField name="firstname" type="text" label="Firstname" />
              <FormField name="lastname" type="text" label="Lastname" />
              <FormField name="email" type="email" label="Email Address" />
              <FormField name="password" type="password" label="Password" />
              <FormField
                name="confirmPassword"
                type="password"
                label="Confirm Password"
              />
              <div className="flex justify-between mt-[20px] items-center">
                <div className="flex items-center space-x-2">
                  <FaArrowLeft className="text-[#1c68da]" />
                  <Link to="/login">
                    <p className="text-[#1c68da]">Login</p>
                  </Link>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`h-[40px] w-[120px] ${
                    isSubmitting ? "bg-gray-400" : "bg-[#a5923e]"
                  } rounded-[10px] p-2`}
                >
                  {isSubmitting ? "Submitting..." : "Signup"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupPage;

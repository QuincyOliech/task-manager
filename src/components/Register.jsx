import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/images/background4.avif';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div
      className="fixed z-50 inset-0 bg-opacity-75"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backdropFilter: 'blur(8px)' }}
    >
      <div className=" min-h-screen flex flex-col items-center justify-center mx-auto px-4 py-10 ">
      <div className="container h-100 w-96 bg-white bg-opacity-40 rounded-2xl shadow-2xl relative z-2 border border-opacity-30 border-r-0 border-b-0 backdrop-filter backdrop-blur-sm ">

        <h1 className="text-4xl text-white font-semibold text-center mb-6">Create An Account</h1>
        <h2 className="text-center m-6 text-white">
                Already registered? <Link to="/login" className="text-custom-blue hover:underline">Go to Login</Link>
              </h2>
        <Formik
          initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.firstName) {
              errors.firstName = 'Required';
            }
            if (!values.lastName) {
              errors.lastName = 'Required';
            }
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            if (!values.password) {
              errors.password = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
              navigate('/login');
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="max-w-md mx-auto p-4">
              <div className="mb-4">
                <label htmlFor="firstName" className="block mb-2 text-white">First Name</label>
                <Field type="text" name="firstName" className="border rounded w-full py-2 px-3" />
                <ErrorMessage name="firstName" component="div" className="text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block mb-2 text-white">Last Name</label>
                <Field type="text" name="lastName" className="border rounded w-full py-2 px-3" />
                <ErrorMessage name="lastName" component="div" className="text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-white">Email</label>
                <Field type="email" name="email" className="border rounded w-full py-2 px-3" />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-2 text-white">Password</label>
                <Field type="password" name="password" className="border rounded w-full py-2 px-3" />
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-custom-blue text-white font-semibold py-2 px-4 rounded w-full hover:bg-blue-500"
              >
                Register
              </button>

            </Form>
          )}
        </Formik>
      </div>
    </div>
    </div>
  );
};

export default Register;

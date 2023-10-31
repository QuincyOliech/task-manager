import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
        validate={values => {
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
          <Form className="max-w-md mx-auto">
            <div className="mb-4 flex justify-between">
              <div className="w-1/2 mr-2">
                <label htmlFor="firstName" className="block font-semibold mb-2">First Name</label>
                <Field type="text" name="firstName" className="border rounded w-full py-2 px-3" />
                <ErrorMessage name="firstName" component="div" className="text-red-500" />
              </div>
              <div className="w-1/2 ml-2">
                <label htmlFor="lastName" className="block font-semibold mb-2">Last Name</label>
                <Field type="text" name="lastName" className="border rounded w-full py-2 px-3" />
                <ErrorMessage name="lastName" component="div" className="text-red-500" />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold mb-2">Email</label>
              <Field type="email" name="email" className="border rounded w-full py-2 px-3" />
              <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block font-semibold mb-2">Password</label>
              <Field type="password" name="password" className="border rounded w-full py-2 px-3" />
              <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>
            <button type="submit" disabled={isSubmitting} className="bg-custom-blue text-white font-semibold py-2 px-4 rounded w-full hover:bg-blue-700">
              Register
            </button>
            <h2 className="text-center mt-4">
              Already registered? <Link to="/login" className="text-custom-blue hover:underline">Go to Login</Link>
            </h2>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;

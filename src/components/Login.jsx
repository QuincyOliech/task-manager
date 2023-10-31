import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Login = () => (
  <div className="container mx-auto px-4 py-10">
    <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="max-w-md mx-auto">
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
          <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded w-full hover:bg-blue-700">
            Login
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Login;  

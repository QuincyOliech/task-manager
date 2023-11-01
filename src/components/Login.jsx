import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import backgroundImage from '../assets/images/background4.avif';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const notify = () => {
    toast.success('Login successful!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="bg-opacity-75" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backdropFilter: 'blur(8px)' }}>
      <div className="min-h-screen flex flex-col items-center justify-center mx-auto px-4 py-10">
        <div className="container h-100 w-96 bg-white bg-opacity-40 rounded-2xl shadow-2xl relative z-2 border border-opacity-30 border-r-0 border-b-0 backdrop-filter backdrop-blur-sm">

          <h1 className="text-4xl text-white font-semibold text-center mb-6">Login</h1>
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: values.email,
                  password: values.password,
                }),
              })
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  return response.json();
                })
                .then(data => {
                  console.log('Success:', data);
                  notify();
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  });
                  Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                  });
                  navigate("/");
                  setSubmitting(false);
                })
                .catch(error => {
                  console.error('Error:', error);
                  const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  });
                  Toast.fire({
                    icon: 'error',
                    title: 'User not found',

                  });
                  setSubmitting(false);
                });
            }}
          >
            {({ isSubmitting }) => (
              <Form className="max-w-md mx-auto p-4">
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
                  Login
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;

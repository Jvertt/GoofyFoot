import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../index.css';

const Coaching = () => {
  const [coaches, setCoaches] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false); // State to toggle form visibility

  useEffect(() => {
    fetch('http://localhost:5555/users')
      .then(response => response.json())
      .then(data => setCoaches(data));
  }, []);

  const initialValues = {
    name: '',
    email: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    fetch('http://localhost:5555/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    .then(response => response.json())
    .then(data => {
      setCoaches([...coaches, data]);
      resetForm();
      setShowAddForm(false); // Hide the form after submission
      setSubmitting(false);
    })
    .catch(error => {
      console.error('Error:', error);
      setSubmitting(false);
    });
  };

  return (
    <div className="coaching">
      <h1>Our Coaches</h1>

      {/* Toggle Button to Show/Hide Add Coach Form */}
      {!showAddForm && (
        <button onClick={() => setShowAddForm(true)} className="add-coach-button">
          + Add Coach
        </button>
      )}

      {/* Conditional Rendering of Formik Form */}
      {showAddForm && (
        <div className="add-coach-form">
          <h2>Add a New Coach</h2>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <label htmlFor="name">Name</label>
                  <Field type="text" name="name" />
                  <ErrorMessage name="name" component="div" />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <Field type="email" name="email" />
                  <ErrorMessage name="email" component="div" />
                </div>
                <button type="submit" disabled={isSubmitting}>
                  Add Coach
                </button>
                <button type="button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}

      {/* List of Coaches */}
      {coaches.map(coach => (
        <div key={coach.id} className="coach-card">
          <h2>{coach.name}</h2>
          <p>{coach.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Coaching;

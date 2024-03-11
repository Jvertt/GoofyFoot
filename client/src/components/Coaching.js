import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../index.css';
import { fetchCoaches, addCoach } from './CoachesSlice';

const Coaching = () => {
  const dispatch = useDispatch();
  const coaches = useSelector((state) => state.coaches.items);
  const status = useSelector((state) => state.coaches.status);
  const error = useSelector((state) => state.coaches.error);
  
  const [showAddForm, setShowAddForm] = React.useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCoaches());
    }
  }, [status, dispatch]);

  const initialValues = {
    name: '',
    email: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    dispatch(addCoach(values)).then(() => {
      resetForm();
      setShowAddForm(false);
      setSubmitting(false);
    }).catch(() => {
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

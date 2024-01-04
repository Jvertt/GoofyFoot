import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LessonDetails = ({ lessons }) => {
  const { id } = useParams();
  const history = useHistory();
  const lesson = lessons.find(lesson => lesson.id === parseInt(id));

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      try {
        console.log({
          name: values.name,
          email: values.email,
          lesson_id: lesson.id,
          coach_id: selectedCoach,
        });

        const response = await axios.post('http://127.0.0.1:5555/bookings', {
          name: values.name,
          email: values.email,
          lesson_id: lesson.id,
          coach_id: selectedCoach,
        });

        console.log(response.data);

        formik.resetForm();
        history.push('/');
      } catch (error) {
        console.error(error);
      }
    },
  });

  const [coaches, setCoaches] = React.useState([]);
  const [selectedCoach, setSelectedCoach] = React.useState('');

  React.useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5555/users');
        setCoaches(response.data);
        setSelectedCoach(response.data[0].id); // default to the first coach
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoaches();
  }, []);

  if (!lesson) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lesson-details">
      <h2>{lesson.title}</h2>
      <p>{lesson.description}</p>
      <form onSubmit={formik.handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && <div className="error">{formik.errors.name}</div>}
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && <div className="error">{formik.errors.email}</div>}
        <label>Coach:</label>
        <select value={selectedCoach} onChange={e => setSelectedCoach(e.target.value)}>
          {coaches.map(coach => (
            <option key={coach.id} value={coach.id}>
              {coach.name}
            </option>
          ))}
        </select>
        <button type="submit">Book Lesson</button>
      </form>
      {/* Confirmation Popup */}
    </div>
  );
};

export default LessonDetails;

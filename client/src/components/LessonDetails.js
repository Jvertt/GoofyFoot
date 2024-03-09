import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LessonDetails = ({ lessons }) => {
  const { id } = useParams();
  const history = useHistory();
  const lesson = lessons.find(lesson => lesson.id === parseInt(id));
  const [coaches, setCoaches] = React.useState([]);
  const [selectedCoach, setSelectedCoach] = React.useState('');
  const [categoryID, setCategoryID] = React.useState('');

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema,
    onSubmit: async values => {
      try {
        const response = await axios.post('http://127.0.0.1:5555/bookings', {
          name: values.name,
          email: values.email,
          lesson_id: lesson.id,
          user_id: selectedCoach,
          category_id: categoryID
        });
        formik.resetForm();
        history.push('/');
      } catch (error) {
        console.error(error);
      }
    },
  });

  React.useEffect(() => {
    const fetchCoaches = async () => {
      const response = await axios.get('http://127.0.0.1:5555/users');
      setCoaches(response.data);
      if (response.data.length > 0) {
        setSelectedCoach(response.data[0].id);
      }
    };
    fetchCoaches();
  }, [id]);

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
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label>Coach:</label>
        <select value={selectedCoach} onChange={e => setSelectedCoach(e.target.value)}>
          {coaches.map(coach => (
            <option key={coach.id} value={coach.id}>
              {coach.name}
            </option>
          ))}
        </select>
        <label>Category:</label>
        <select value={categoryID} onChange={e => setCategoryID(e.target.value)}>
          <option value="">Select Category</option>
          <option value="1">Surf</option>
          <option value="2">Paddle Board</option>
        </select>
        <button type="submit">Book Lesson</button>
      </form>
    </div>
  );
};

export default LessonDetails;
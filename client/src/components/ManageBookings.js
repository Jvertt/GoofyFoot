import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../index.css';

function ManageBookings() {
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      // Handle form submission here
      console.log(values);

      // Clear the input field after successful submission
      formik.resetForm();
    },
  });

  const [bookings, setBookings] = React.useState([]);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [bookingToCancel, setBookingToCancel] = React.useState(null);

  const fetchBookings = () => {
    axios.get('http://127.0.0.1:5555/bookings')
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  React.useEffect(() => {
    fetchBookings();
  }, []);

  const cancelBooking = (id) => {
    const booking = bookings.find(booking => booking.id === id);
    setBookingToCancel(booking);
    setShowConfirmation(true);
  };

  const handleConfirmation = () => {
    axios.delete(`http://127.0.0.1:5555/bookings/${bookingToCancel.id}`)
      .then(() => {
        // Fetch the bookings from the server again after the deletion.
        return axios.get('http://127.0.0.1:5555/bookings');
      })
      .then(response => {
        setBookings(response.data);
        setShowConfirmation(false);
        history.push('/');
      })
      .catch(error => {
        console.error(error);
        setShowConfirmation(false);
      });
  };

  const filteredBookings = bookings.filter(booking => booking.name.toLowerCase() === formik.values.name.toLowerCase());

  return (
    <div className="manage-bookings-container">
      <form onSubmit={formik.handleSubmit}>
        <input
          className="name-input"
          type="text"
          placeholder="Enter your name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && <div className="error">{formik.errors.name}</div>}

        {filteredBookings.map(booking => (
          <div key={booking.id} className="booking-item">
            <p className="booking-name">{booking.name}</p>
            <p className="booking-email">{booking.email}</p>
            <button className="cancel-button" onClick={() => cancelBooking(booking.id)}>Cancel Booking</button>
          </div>
        ))}

        {showConfirmation && bookingToCancel && (
          <div className="confirmation-overlay">
            <div className="confirmation-popup">
              <h3>Confirm Booking Cancellation</h3>
              <p>Please confirm the cancellation of the booking:</p>
              <p>Name: {bookingToCancel.name}</p>
              <p>Email: {bookingToCancel.email}</p>
              <button onClick={handleConfirmation}>Confirm</button>
              <button onClick={() => setShowConfirmation(false)}>Cancel</button>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}

export default ManageBookings;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../index.css';

function ManageBookings() {
  const history = useHistory();
  const [bookings, setBookings] = useState([]);
  const [name, setName] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  const fetchBookings = () => {
    axios.get('http://127.0.0.1:5555/bookings')
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
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

  const filteredBookings = bookings.filter(booking => booking.name.toLowerCase() === name.toLowerCase());

  return (
    <div className="manage-bookings-container">
      <input className="name-input" type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} />
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
    </div>
  );
};

export default ManageBookings;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageBookings () {
  const [bookings, setBookings] = useState([]);
  const [name, setName] = useState('');

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

  function cancelBooking(id) {
    axios.delete(`http://127.0.0.1:5555/bookings/${id}`)
      .then(() => {
        // Fetch the bookings from the server again after the deletion.
        return axios.get('http://127.0.0.1:5555/bookings');
      })
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error(error);
      });
};

  const filteredBookings = bookings.filter(booking => booking.name.toLowerCase() === name.toLowerCase());

  return (
    <div>
      <input type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} />
      {filteredBookings.map(booking => (
        <div key={booking.id}>
          <p>{booking.name}</p>
          <p>{booking.email}</p>
          <button onClick={() => cancelBooking(booking.id)}>Cancel Booking</button>
        </div>
      ))}
    </div>
  );
};

export default ManageBookings;

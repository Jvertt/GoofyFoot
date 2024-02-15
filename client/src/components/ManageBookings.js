import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../index.css';

function ManageBookings() {
    const history = useHistory();
    const [bookings, setBookings] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [bookingToEdit, setBookingToEdit] = useState(null);
    const [bookingToCancel, setBookingToCancel] = useState(null);

    const fetchBookings = () => {
        axios.get('http://127.0.0.1:5555/bookings')
            .then(response => setBookings(response.data))
            .catch(error => console.error('Error fetching bookings:', error));
    }

    useEffect(() => {
        fetchBookings();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            
        }),
        onSubmit: (values, { setSubmitting }) => {
            axios.put(`http://127.0.0.1:5555/bookings/${bookingToEdit.id}`, values)
                .then(() => {
                    fetchBookings();
                    setBookingToEdit(null);
                })
                .catch(error => {
                    console.error('Error updating booking:', error);
                    alert('Failed to update booking');
                })
                .finally(() => setSubmitting(false));
        },
    });

    const startEditBooking = (booking) => {
        setBookingToEdit(booking);
        formik.setValues({ name: booking.name, email: booking.email });
    };

    const cancelBooking = (id) => {
        const booking = bookings.find(b => b.id === id);
        setBookingToCancel(booking);
        setShowConfirmation(true);
    };

    const handleConfirmation = () => {
        axios.delete(`http://127.0.0.1:5555/bookings/${bookingToCancel.id}`)
            .then(() => {
                fetchBookings();
                setShowConfirmation(false);
                history.push('/');
            })
            .catch(error => {
                console.error('Error deleting booking:', error);
                setShowConfirmation(false);
            });
    };

    return (
        <div className="manage-bookings-container">
            {bookingToEdit ? (
                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    {/* Include other fields as necessary */}
                    <button type="submit">Save Changes</button>
                    <button onClick={() => setBookingToEdit(null)}>Cancel</button>
                </form>
            ) : (
                bookings.map(booking => (
                    <div key={booking.id} className="booking-item">
                        <p className="booking-name">{booking.name}</p>
                        <p className="booking-email">{booking.email}</p>
                        <button className="edit-booking" onClick={() => startEditBooking(booking)}>Edit Booking</button>
                        <button className="cancel-booking" onClick={() => cancelBooking(booking.id)}>Cancel Booking</button>
                    </div>
                ))
            )}

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
}

export default ManageBookings;

from app import db, app  # Import the Flask application instance directly
from models import User, Lesson, Session, Booking
from faker import Faker
from sqlalchemy.exc import IntegrityError
import random
from datetime import datetime, timedelta

fake = Faker()

with app.app_context():
    # Generate 10 users
    for _ in range(10):
        user = User(name=fake.unique.name(), email=fake.unique.email())
        db.session.add(user)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()

    # Get all users
    users = User.query.all()

    # Generate 50 lessons
    for _ in range(50):
        lesson = Lesson(title=fake.catch_phrase(), 
                        description=fake.text(), 
                        datetime=fake.future_datetime(end_date="+30d"), 
                        coach_id=random.choice(users).id)
        db.session.add(lesson)
    db.session.commit()

    # Get all lessons
    lessons = Lesson.query.all()

    # Generate 50 sessions
    for _ in range(50):
        session = Session(title=fake.catch_phrase(), 
                          description=fake.text(), 
                          datetime=fake.future_datetime(end_date="+30d"), 
                          coach_id=random.choice(users).id)
        db.session.add(session)
    db.session.commit()

    # Generate 200 bookings
    for _ in range(200):
        booking = Booking(student_id=random.choice(users).id, 
                          lesson_id=random.choice(lessons).id)
        db.session.add(booking)
    db.session.commit()
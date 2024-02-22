from app import db, app
from models import User, Lesson, Booking
from faker import Faker
from sqlalchemy.exc import IntegrityError
import random
from datetime import datetime, timedelta

fake = Faker()

def seed_users(n):
    users = []
    for _ in range(n):
        user = User(name=fake.unique.name(), email=fake.unique.email())
        users.append(user)
    db.session.bulk_save_objects(users)
    db.session.commit()

def seed_lessons(users, n):
    lessons = []
    for _ in range(n):
        lesson = Lesson(
            title=fake.catch_phrase(),
            description=fake.text(),
            datetime=fake.future_datetime(end_date="+30d"),
            coach_id=random.choice(users).id
        )
        lessons.append(lesson)
    db.session.bulk_save_objects(lessons)
    db.session.commit()

def seed_bookings(lessons, n):
    bookings = []
    for _ in range(n):
        booking = Booking(
            name=fake.name(),  # Not enforcing uniqueness here
            email=fake.email(),
            lesson_id=random.choice(lessons).id,
            user_id=random.choice(users).id  # Assuming you want to link bookings to users
        )
        bookings.append(booking)
    db.session.bulk_save_objects(bookings)
    db.session.commit()

with app.app_context():
    # Seed Users
    seed_users(10)
    users = User.query.all()

    # Seed Lessons
    seed_lessons(users, 50)
    lessons = Lesson.query.all()

    # Seed Bookings
    seed_bookings(lessons, 200)

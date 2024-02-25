from app import db, app
from models import User, Lesson, Booking, Category
from faker import Faker
import random

fake = Faker()

def seed_users(n):
    users = [User(name=fake.unique.name(), email=fake.unique.email()) for _ in range(n)]
    db.session.bulk_save_objects(users)
    db.session.commit()

def seed_lessons(users, n):
    lessons = [Lesson(
        title=fake.catch_phrase(),
        description=fake.text(),
        datetime=fake.future_datetime(end_date="+30d"),
        coach_id=random.choice(users).id
    ) for _ in range(n)]
    db.session.bulk_save_objects(lessons)
    db.session.commit()

def seed_categories():
    categories = [Category(name="Surf"), Category(name="Paddle Board")]
    db.session.bulk_save_objects(categories)
    db.session.commit()

def seed_bookings(lessons, users, categories, n):
    for _ in range(n):
        # Ensure categories are fetched only once, outside the loop
        category_id = random.choice(categories).id
        booking = Booking(
            name=fake.name(),
            email=fake.email(),
            lesson_id=random.choice(lessons).id,
            user_id=random.choice(users).id,
            category_id=category_id  # Randomly assign a category ID
        )
        db.session.add(booking)
    db.session.commit()

with app.app_context():
    db.drop_all()
    db.create_all()

    seed_categories()
    # Fetch categories once and pass them to the seed_bookings function
    categories = Category.query.all()

    seed_users(10)
    # Re-fetch users to ensure they are available for the next steps
    users = User.query.all()

    seed_lessons(users, 50)
    # Re-fetch lessons to ensure they are available for booking seeding
    lessons = Lesson.query.all()

    seed_bookings(lessons, users, categories, 200)

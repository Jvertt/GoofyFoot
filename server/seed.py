from app import db, app  # Import the Flask application instance directly
from models import User, Product, Review
from faker import Faker
from sqlalchemy.exc import IntegrityError
import random

fake = Faker()

with app.app_context():
    # Generate 10 users
    for _ in range(10):
        user = User(username=fake.unique.user_name(), password='test')
        db.session.add(user)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()

    # Get all users
    users = User.query.all()

    # Generate 50 products
    for _ in range(50):
        product = Product(title=fake.catch_phrase(), description=fake.text(), user=random.choice(users))
        db.session.add(product)
    db.session.commit()

    # Get all products
    products = Product.query.all()

    # Generate 200 reviews
    for _ in range(200):
        review = Review(content=fake.text(), user=random.choice(users), reviewed_products=random.sample(products, k=random.randint(1, min(3, len(products)))))
        db.session.add(review)
    db.session.commit()

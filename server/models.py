from sqlalchemy_serializer import SerializerMixin
from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    bookings = db.relationship("Booking", back_populates="user")
    lessons = db.relationship("Lesson", secondary="bookings", back_populates="users", lazy=True)
    serialize_rules = ('-lessons', '-bookings.lesson', '-bookings.user',)

class Lesson(db.Model, SerializerMixin):
    __tablename__ = "lessons"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    datetime = db.Column(db.DateTime, nullable=False)
    coach_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    bookings = db.relationship("Booking", back_populates="lesson", lazy=True)
    users = db.relationship("User", secondary="bookings", back_populates="lessons", lazy=True)
    serialize_only = ('id', 'title', 'description', 'datetime', 'coach_id',)

class Booking(db.Model, SerializerMixin):
    __tablename__ = "bookings"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=True) 
    lesson = db.relationship("Lesson", back_populates="bookings")
    user = db.relationship("User", back_populates="bookings")
    serialize_only = ('id', 'name', 'email', 'lesson_id', 'user_id', 'category.name',)

class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    bookings = db.relationship("Booking", back_populates="category")  

Booking.category = db.relationship("Category", back_populates="bookings")

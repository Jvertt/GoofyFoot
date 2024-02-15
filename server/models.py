# models.py
from sqlalchemy_serializer import SerializerMixin
from config import db


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)

    lessons = db.relationship("Lesson", backref="coach", lazy=True)

    # Many-to-many relationship using the 'enrollment' table

    serialize_only = ('id', 'name', 'email')

class Lesson(db.Model, SerializerMixin):
    __tablename__ = "lessons"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    datetime = db.Column(db.DateTime, nullable=False)
    #instructor = db.Column(db.String, nullable=False)

    coach_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    bookings = db.relationship("Booking", backref="booked_lesson", lazy=True)

    serialize_only = ('id', 'title', 'description', 'datetime', 'coach_id')


class Booking(db.Model, SerializerMixin):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    lesson = db.relationship("Lesson", backref="bookings_in_lesson")


    serialize_only = ('id', 'name', 'email', 'lesson_id','user_id')

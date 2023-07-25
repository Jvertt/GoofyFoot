from sqlalchemy_serializer import SerializerMixin
from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)

    lessons = db.relationship("Lesson", backref="coach", lazy=True)
    sessions = db.relationship("Session", backref="coach", lazy=True)

    serialize_only = ('id', 'name', 'email')

class Lesson(db.Model, SerializerMixin):
    __tablename__ = "lessons"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    datetime = db.Column(db.DateTime, nullable=False)

    coach_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    sessions = db.relationship("Session", secondary="link", back_populates="lessons")
    bookings = db.relationship("Booking", backref="booked_lesson", lazy=True)

    serialize_only = ('id', 'title', 'description', 'datetime', 'coach_id')

class Session(db.Model, SerializerMixin):
    __tablename__ = "sessions"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    datetime = db.Column(db.DateTime, nullable=False)

    coach_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    lessons = db.relationship("Lesson", secondary="link", back_populates="sessions")

    serialize_only = ('id', 'title', 'description', 'datetime', 'coach_id')

class Booking(db.Model, SerializerMixin):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.id'), nullable=False)

    lesson = db.relationship("Lesson", backref="bookings_in_lesson")

    serialize_only = ('id', 'name', 'email', 'lesson_id')

link = db.Table('link',
    db.Column('session_id', db.Integer, db.ForeignKey('sessions.id'), primary_key=True),
    db.Column('lesson_id', db.Integer, db.ForeignKey('lessons.id'), primary_key=True)
)

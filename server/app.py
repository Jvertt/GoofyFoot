#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource
from models import User, Lesson, Session, Booking

# Local imports
from config import app, db, api

@app.route("/")
def index():
    return "Hello world!"

class Users(Resource):
    def get(self):
        users = [{"id" : user.id, 
                  "name" : user.name, 
                  "email" : user.email
        } for user in User.query.all()]
        response = make_response(users, 200)
        return response

api.add_resource(Users, "/users", endpoint = "users")

class Lessons(Resource):
    def get(self):
        lessons = [{"id" : lesson.id, 
                    "title" : lesson.title,
                    "description" : lesson.description, 
                    "datetime" : lesson.datetime.isoformat(),
                    "coach_id" : lesson.coach_id
        } for lesson in Lesson.query.all()]
        response = make_response(lessons, 200)
        return response

api.add_resource(Lessons, "/lessons", endpoint = "lessons")

class Sessions(Resource):
    def get(self):
        sessions = [{"id" : session.id, 
                     "title" : session.title,
                     "description" : session.description, 
                     "datetime" : session.datetime.isoformat(),
                     "coach_id" : session.coach_id
        } for session in Session.query.all()]
        response = make_response(sessions, 200)
        return response

api.add_resource(Sessions, "/sessions", endpoint = "sessions")

class Bookings(Resource):
    def get(self):
        bookings = [{"id" : booking.id, 
                     "name" : booking.name, 
                     "email" : booking.email, 
                     "lesson_id" : booking.lesson_id
        } for booking in Booking.query.all()]
        response = make_response(bookings, 200)
        return response

api.add_resource(Bookings, "/bookings", endpoint = "bookings")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

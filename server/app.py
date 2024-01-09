#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource
from models import User, Lesson, Booking

# Local imports
from config import app, db, api

@app.route("/")
def index():
    return "Hello world!"

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(users, 200)

    def post(self):
        new_user = User(
            name=request.json['name'],
            email=request.json['email']
        )
        db.session.add(new_user)
        db.session.commit()
        return make_response(new_user.to_dict(), 201)

    def put(self):
        user_id = request.view_args['id']
        user = User.query.get(user_id)
        if user:
            user.name = request.json.get('name', user.name)
            user.email = request.json.get('email', user.email)
            db.session.commit()
            return make_response(user.to_dict(), 200)
        return {"message": "User not found"}, 404

    def delete(self, id):
        user = User.query.get(id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return {"message": f"User with id {id} deleted"}, 200
        return {"message": "User not found"}, 404

api.add_resource(Users, "/users", "/users/<int:id>", endpoint="users")

class Lessons(Resource):
    def get(self):
        lessons = [lesson.to_dict() for lesson in Lesson.query.all()]
        return make_response(lessons, 200)

    def post(self):
        new_lesson = Lesson(
            title=request.json['title'],
            description=request.json['description'],
            datetime=request.json['datetime'],
            coach_id=request.json['coach_id']
        )
        db.session.add(new_lesson)
        db.session.commit()
        return make_response(new_lesson.to_dict(), 201)

    def put(self):
        lesson_id = request.view_args['id']
        lesson = Lesson.query.get(lesson_id)
        if lesson:
            lesson.title = request.json.get('title', lesson.title)
            lesson.description = request.json.get('description', lesson.description)
            lesson.datetime = request.json.get('datetime', lesson.datetime)
            lesson.coach_id = request.json.get('coach_id', lesson.coach_id)
            db.session.commit()
            return make_response(lesson.to_dict(), 200)
        return {"message": "Lesson not found"}, 404

    def delete(self, id):
        lesson = Lesson.query.get(id)
        if lesson:
            db.session.delete(lesson)
            db.session.commit()
            return {"message": f"Lesson with id {id} deleted"}, 200
        return {"message": "Lesson not found"}, 404

api.add_resource(Lessons, "/lessons", "/lessons/<int:id>", endpoint="lessons")

class Bookings(Resource):
    def get(self):
        bookings = [booking.to_dict() for booking in Booking.query.all()]
        return make_response(bookings, 200)

    def post(self):
        new_booking = Booking(
            name=request.json['name'],
            email=request.json['email'],
            lesson_id=request.json['lesson_id']
        )
        db.session.add(new_booking)
        db.session.commit()
        return make_response(new_booking.to_dict(), 201)

    def put(self, id):
        try:
            booking = Booking.query.get(id)
            if not booking:
                return make_response(jsonify({"message": "Booking not found"}), 404)

            data = request.get_json()
            booking.name = data.get('name', booking.name)
            booking.email = data.get('email', booking.email)
            booking.lesson_id = data.get('lesson_id', booking.lesson_id)
            db.session.commit()
            return make_response(jsonify(booking.to_dict()), 200)
        except Exception as e:
            db.session.rollback()
            app.logger.error(f'Error updating booking: {e}')
            return make_response(jsonify({"message": "Error updating booking", "error": str(e)}), 500)

    def delete(self, id):
        booking = Booking.query.get(id)
        if booking:
            db.session.delete(booking)
            db.session.commit()
            return {"message": f"Booking with id {id} deleted"}, 200
        return {"message": "Booking not found"}, 404

api.add_resource(Bookings, "/bookings", "/bookings/<int:id>", endpoint="bookings")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

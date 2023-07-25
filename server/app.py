#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource
from models import User,Review,Product

# Local imports
from config import app, db, api
# from models import User, Recipe

# Views go here!

@app.route("/")
def index():
    return "Hello world!"

class Reviews(Resource):
    def get(self):
        reviews = [{"id" : review.id, 
            "content" : review.content, 
            "user_id" : review.user_id
        } for review in Review.query.all()]
        response = make_response(
            reviews, 
            200
        )

        return response

api.add_resource(Reviews, "/reviews", endpoint = "reviews")




if __name__ == '__main__':
    app.run(port=5555, debug=True)
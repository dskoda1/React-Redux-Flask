import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt


app = Flask(__name__, static_folder="./static/dist", template_folder="./static")

if os.environ.get('TESTING'):
    from config import TestingConfig
    app.config.from_object(TestingConfig)
else:
    from config import BaseConfig
    app.config.from_object(BaseConfig)


db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

import application.routes

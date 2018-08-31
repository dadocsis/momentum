import os
import appdirs
"""Default configuration

Use env var to override
"""
DEBUG = True
SECRET_KEY = "peepee5onedodo"

path = appdirs.user_data_dir('momentum')
if not os.path.exists(path):
    os.makedirs(path)

path = os.path.join(path, 'app.db')
SQLALCHEMY_DATABASE_URI = "sqlite:///" + path
SQLALCHEMY_TRACK_MODIFICATIONS = False

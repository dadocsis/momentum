from setuptools import setup, find_packages

__version__ = '0.1'


setup(
    name='momentum_api',
    version=__version__,
    packages=find_packages(exclude=['tests']),
    install_requires=[
        'flask',
        'flask-sqlalchemy',
        'flask-restful',
        'flask-migrate',
        'flask-jwt-extended',
        'flask-marshmallow',
        'marshmallow-sqlalchemy',
        'passlib',
        'Scrapy==1.5.0',
        'appdirs==1.4.3'
    ],
    entry_points={
        'console_scripts': [
            'momentum_api = momentum_api.manage:cli'
        ]
    }
)

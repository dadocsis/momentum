import click
import os
from flask.cli import FlaskGroup

from momentum_api.app import create_app


def create_momentum_api(info):
    return create_app(cli=True)


@click.group(cls=FlaskGroup, create_app=create_momentum_api)
def cli():
    """Main entry point"""


@cli.command("init")
def init():
    """Init application, create database tables
    and create a new user named admin with password admin
    """
    from momentum_api.extensions import db
    from momentum_api.models import User
    click.echo("create database")
    db.create_all()
    click.echo("done")

    click.echo("create user")
    user = User(
        username='admin',
        email='admin@mail.com',
        password=os.environ['ADMINPW'],
        active=True
    )
    db.session.add(user)
    db.session.commit()
    click.echo("created user admin")


if __name__ == "__main__":
    cli()

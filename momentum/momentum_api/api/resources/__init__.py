from flask import request
from flask_restful import Resource

from momentum_api.models import User, Stock
from momentum_api.extensions import ma, db
from momentum_api.commons.pagination import paginate
from momentum_api.auth import api_auth


class UserSchema(ma.ModelSchema):

    password = ma.String(load_only=True, required=True)

    class Meta:
        model = User
        sqla_session = db.session


class StockSchema(ma.ModelSchema):
    class Meta:
        model = Stock
        sqla_session = db.session


class UserResource(Resource):
    """Single object resource
    """
    method_decorators = [api_auth]

    def get(self, user_id):
        schema = UserSchema()
        user = User.query.get_or_404(user_id)
        return {"user": schema.dump(user).data}

    def put(self, user_id):
        schema = UserSchema(partial=True)
        user = User.query.get_or_404(user_id)
        user, errors = schema.load(request.json, instance=user)
        if errors:
            return errors, 422

        return {"msg": "user updated", "user": schema.dump(user).data}

    def delete(self, user_id):
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()

        return {"msg": "user deleted"}


class UserList(Resource):
    """Creation and get_all
    """
    method_decorators = [api_auth]

    def get(self):
        schema = UserSchema(many=True)
        query = User.query
        return paginate(query, schema)

    def post(self):
        schema = UserSchema()
        user, errors = schema.load(request.json)
        if errors:
            return errors, 422

        db.session.add(user)
        db.session.commit()

        return {"msg": "user created", "user": schema.dump(user).data}, 201


class StocksResources(Resource):

    method_decorators = [api_auth]

    def get(self, **kwargs):
        create_date = request.args.get('create_date', None)
        schema = StockSchema(many=True)
        query = Stock.query.filter(
            create_date is None or Stock.save_date == create_date)
        return paginate(query, schema)

    def post(self):
        schema = StockSchema()
        stock, errors = schema.load(request.json)
        if errors:
            return errors, 422

        db.session.add(stock)
        db.session.commit()

        return {"msg": "user created", "user": schema.dump(stock).data}, 201


class StockResource(Resource):

    method_decorators = [api_auth]

    def get(self, symbol):
        schema = StockSchema()
        stock = Stock.query.filter_by(symbol=symbol).first_or_404()
        return schema.dump(stock).data

from momentum_api.extensions import db, pwd_context


class User(db.Model):
    """Basic user model
    """
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    active = db.Column(db.Boolean, default=True)

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)
        self.password = pwd_context.hash(self.password)

    def __repr__(self):
        return "<User %s>" % self.username


class Stock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    save_date = db.Column(db.Date, nullable=False)
    name = db.Column(db.String(), nullable=False)
    symbol = db.Column(db.String(), nullable=False, unique=True)
    scrape_details = db.relationship('ScrapeDetails', backref='stock',
                                     lazy=True)


class Scrape(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    scrape_date = db.Column(db.DateTime, nullable=False)
    details = db.relationship('ScrapeDetails',
                              backref='scrape',
                              lazy=True)


class ScrapeDetails(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    stock_id = db.Column(db.Integer, db.ForeignKey('stock.id'))
    scrape_price = db.Column(db.DECIMAL, nullable=False)
    scrape_id = db.Column(db.Integer, db.ForeignKey('scrape.id'))

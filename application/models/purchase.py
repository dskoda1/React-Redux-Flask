from index import db

class Purchase(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(100), unique=False)
    category_id = db.Column(db.Integer(), db.ForeignKey('category.id'))

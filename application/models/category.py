from index import db

class Category(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(100), unique=False)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id
        }

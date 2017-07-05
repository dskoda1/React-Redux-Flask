from index import db

class Category(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(100), unique=False)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))

    @staticmethod
    def get_user_categories(user_id):
        return Category.query.filter_by(
                    user_id=user_id
                ).all()


    def attr(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id
        }

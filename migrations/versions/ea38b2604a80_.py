"""Create the category table.

Revision ID: ea38b2604a80
Revises: ed657e16ce20
Create Date: 2017-07-01 03:45:05.442176

"""

# revision identifiers, used by Alembic.
revision = 'ea38b2604a80'
down_revision = 'ed657e16ce20'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table('category',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(
                columns=['user_id'],
                refcolumns=['user.id'],
                ondelete='CASCADE'
            )
    )


def downgrade():
    op.drop_table('category')

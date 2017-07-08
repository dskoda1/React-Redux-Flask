"""Create the purchase table.

Revision ID: bfec51a397a8
Revises: ea38b2604a80
Create Date: 2017-07-08 17:44:08.930090

"""

# revision identifiers, used by Alembic.
revision = 'bfec51a397a8'
down_revision = 'ea38b2604a80'

from alembic import op
import sqlalchemy as sa


def upgrade():
    op.create_table('purchase',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.VARCHAR(length=255), nullable=False),
        sa.Column('category_id', sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(
                columns=['category_id'],
                refcolumns=['category.id'],
                ondelete='CASCADE'
            )
    )


def downgrade():
    op.alter_column('category', 'name',
               existing_type=sa.VARCHAR(length=255),
               nullable=False)
    op.drop_table('purchase')

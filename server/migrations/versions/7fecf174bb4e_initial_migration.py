"""Initial migration

Revision ID: 7fecf174bb4e
Revises: ff59f6c50df6
Create Date: 2024-02-13 18:12:10.482569

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7fecf174bb4e'
down_revision = 'ff59f6c50df6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    # op.drop_table('enrollments')  # This line has been commented out because the 'enrollments' table does not exist.
    with op.batch_alter_table('bookings', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=False))
        batch_op.create_foreign_key(batch_op.f('fk_bookings_user_id_users'), 'users', ['user_id'], ['id'])

    with op.batch_alter_table('lessons', schema=None) as batch_op:
        batch_op.add_column(sa.Column('instructor', sa.String(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('lessons', schema=None) as batch_op:
        batch_op.drop_column('instructor')

    with op.batch_alter_table('bookings', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_bookings_user_id_users'), type_='foreignkey')
        batch_op.drop_column('user_id')

    # Commenting out the creation of 'enrollments' table on downgrade since it was never part of the schema.
    # op.create_table('enrollments',
    # sa.Column('user_id', sa.INTEGER(), nullable=False),
    # sa.Column('lesson_id', sa.INTEGER(), nullable=False),
    # sa.ForeignKeyConstraint(['lesson_id'], ['lessons.id'], name='fk_enrollments_lesson_id_lessons'),
    # sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='fk_enrollments_user_id_users'),
    # sa.PrimaryKeyConstraint('user_id', 'lesson_id')
    # )
    # ### end Alembic commands ###
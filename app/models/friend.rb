# == Schema Information
#
# Table name: friends
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  friend_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Friend < ApplicationRecord
    validates_uniqueness_of :user_id, :scope => [:friend_id]

    belongs_to :user,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :User

    belongs_to :friend,
        primary_key: :id,
        foreign_key: :friend_id,
        class_name: :User
end

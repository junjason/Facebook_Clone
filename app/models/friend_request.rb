class FriendRequest < ApplicationRecord
  belongs_to :requester, 
    primary_key: :id,
    foreign_key: :requester_id,
    class_name: :User

  belongs_to :recipient,
    primary_key: :id,
    foreign_key: :recipient_id, 
    class_name: :User

  validates :status, inclusion: { in: %w[pending accepted rejected] }
end

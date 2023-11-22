# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string           not null
#  phone_number    :string
#  birthday        :date             not null
#  gender          :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  pronoun         :string
#  bio             :text
#
class User < ApplicationRecord
    has_secure_password

    validates :first_name, :last_name, :email, :birthday, 
      :gender, :password_digest, :session_token, presence: true
 
    validates :email, :session_token, uniqueness: true

    validates :email, 
      length: {in: 4..120},
      format: {with: URI::MailTo::EMAIL_REGEXP}
    
    validates :password,
      length: {in: 6..30}, allow_nil: true
    
    validates :phone_number,
      length: {in: 10..15 }, allow_nil: true

    before_validation :ensure_session_token, :set_pronouns

    # Associations
    has_one_attached :profile_photo
    has_one_attached :cover_photo

    has_many :friend_connections,
      primary_key: :id,
      foreign_key: :user_id,
      class_name: :Friend,
      dependent: :destroy

    has_many :friends_of,
      primary_key: :id,
      foreign_key: :friend_id,
      class_name: :Friend,
      dependent: :destroy

    has_many :posts_created,
      primary_key: :id,
      foreign_key: :author_id,
      class_name: :Post,
      dependent: :destroy
    
    has_many :wall_posts,
      primary_key: :id,
      foreign_key: :user_wall_id,
      class_name: :Post,
      dependent: :destroy

    has_many :friends,
      through: :friend_connections,
      source: :friend

    has_many :sent_friend_requests, 
      class_name: :FriendRequest, 
      foreign_key: :requester_id, 
      primary_key: :id,
      dependent: :destroy

    has_many :received_friend_requests, 
      class_name: :FriendRequest, 
      foreign_key: :recipient_id, 
      primary_key: :id,
      dependent: :destroy
    

    # Set pronouns based on gender
    def set_pronouns
      if self.pronoun == nil
        if self.gender == "Male"
          self.pronoun = "He"
        elsif self.gender == "Female"
          self.pronoun = "She"
        else
          self.pronoun = "They"
        end 
      end
    end

    def friends?(user_id)
      if Friend.where(user_id: self.id, friend_id: user_id).exists?
        return "True"
      elsif FriendRequest.where(requester_id: self.id, recipient_id: user_id).exists?
        return "Sent"
      elsif FriendRequest.where(requester_id: user_id, recipient_id: self.id).exists?
        return "Received"
      else 
        return "False"
      end
    end

    def friend_request_id(user_id)
      if self.friends?(user_id) == "Sent" 
        fr = FriendRequest.where(requester_id: self.id, recipient_id: user_id).limit(1);
        return fr.ids
      elsif self.friends?(user_id) == "Received"
        fr = FriendRequest.where(requester_id: user_id, recipient_id: self.id).limit(1);
        return fr.ids
      end
    end

    def friend_id(user_id)
      friend_obj = nil
      if Friend.where(user_id: self.id, friend_id: user_id).exists?
        friend_obj = Friend.where(user_id: self.id, friend_id: user_id).limit(1)
        return friend_obj.first.id
      end
    end

    # Rest of FIGVAPEBR
    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
    
        if user&.authenticate(password)
          return user
        else 
          nil
        end
    end
    
    def reset_session_token!
        self.session_token = generate_unique_session_token
        self.save!
        self.session_token
    end
    
    private
    def generate_unique_session_token
        loop do 
          session_token = SecureRandom.urlsafe_base64
          return session_token if !User.exists?(session_token: session_token)
        end
    end
    
    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end
end

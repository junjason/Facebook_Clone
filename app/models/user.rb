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

    before_validation :ensure_session_token

    # Associations
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

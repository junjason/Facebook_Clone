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

    # credential can be either phone number or email
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

friends = @user.friends
friends_ids = friends.pluck(:friend_id)
received_friend_requests = @user.received_friend_requests.includes(:requester)

json.user do 
    json.extract! @user, :id, :first_name, :last_name, :email, :birthday, :gender, :bio, :pronoun, :phone_number
    json.profile_photo_url @user.profile_photo.attached? ? @user.profile_photo.url : nil
    json.friend_ids friends_ids
    
    # json.friend_requests_requester received_friend_requests
end

puts json.target!
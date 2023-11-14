friends = @user.friend_connections.includes(:friend)
friend_ids = friends.pluck(:friend_id)

json.user do
    json.extract! @user, :id, :first_name, :last_name, :email, :birthday, :gender
end
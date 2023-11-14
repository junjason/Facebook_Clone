friends = @user.friend_connections.includes(:friend)
# user_friends = []
user_friends = friends.pluck(:friend_id)

p friends
p user_friends

json.user do
    json.extract! @user, :id, :first_name, :last_name, :email, :birthday, :gender
    json.friends user_friends
end
# json.friends do 
#     friends.each do |friendship|
#         json.set! friendship.friend_id do 
#             json.extract! friendship.friend, :id, :first_name, :last_name
#         end
#     end
# end


# json.friends do
#     friends.each do |friendship|
#         json.set! friendship.id do
#             json.extract! friendship, :id, :user_id, :friend_id
#         end
#     end
# end


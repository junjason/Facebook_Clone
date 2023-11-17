friends = @user.friend_connections.includes(:friend)
friend_ids = friends.pluck(:friend_id)
posts = @user.wall_posts.pluck(:id)

# puts "printing friends"
# p friends

# json.set! @user.id do 
json.user do
    json.extract! @user, :id, :first_name, :last_name, :email, :birthday, :gender, :bio, :pronoun, :phone_number
    json.friends friend_ids
    json.wall_posts posts
end
# end
# json.friends do 
#     friends.each do |friendship|
#         json.set! friendship.friend_id do 
#             json.extract! friendship.friend, :id, :first_name, :last_name
#         end
#     end
# end



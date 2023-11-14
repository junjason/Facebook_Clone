friends = @user.friend_connections.includes(:friend)
friend_ids = friends.pluck(:friend_id)

# puts "printing friends"
# p friends

json.user do
    json.set! @user.id do 
        json.extract! @user, :id, :first_name, :last_name, :email, :birthday, :gender
        json.friends friend_ids
    end
    json.friends do 
        friends.each do |friendship|
            json.set! friendship.friend_id do 
                json.extract! friendship.friend, :id, :first_name, :last_name
            end
        end
    end
end

# recomment this when when you have a friends reducer



# json.friends do
#     friends.each do |friendship|
#         json.set! friendship.id do
#             json.extract! friendship, :id, :user_id, :friend_id
#         end
#     end
# end


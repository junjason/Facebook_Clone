@users.each do |user|
    friends = user.friend_connections.includes(:friend)
    friend_ids = friends.pluck(:friend_id)
    posts = user.wall_posts.pluck(:id)
    json.set! user.id do 
        json.extract! user, :id, :first_name, :last_name, :email, :birthday, :gender, :bio, :pronoun, :phone_number
        json.friends friend_ids
        json.wall_posts posts
    end
end
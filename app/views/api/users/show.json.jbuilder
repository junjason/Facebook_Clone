friends = @user.friends
friends_ids = friends.pluck(:friend_id)
wall_posts = @user.wall_posts.order("created_at DESC")
wall_posts_ids = wall_posts.pluck(:id)

# for friend_requests reducer
sent_friend_requests = @user.sent_friend_requests.includes(:requester, :recipient)
sent_friend_requests_ids = sent_friend_requests.pluck(:id)

received_friend_requests = @user.received_friend_requests.includes(:requester, :recipient)
received_friend_requests_ids = received_friend_requests.pluck(:id)


# for users reducer
json.users do
    json.set! @user.id do
        json.extract! @user, :id, :first_name, :last_name, :email, :birthday, :gender, :bio, :pronoun, :phone_number
        json.profile_photo_url @user.profile_photo.attached? ? @user.profile_photo.url : nil
        json.cover_photo_url @user.cover_photo.attached? ? @user.cover_photo.url : nil
        json.friend_ids friends_ids
        json.wall_posts_ids wall_posts_ids
        json.friend_status current_user.friends?(@user.id)
        json.friend_request_id current_user.friend_request_id(@user.id)
        json.friendship_id current_user.friend_id(@user.id)
    end
    friends.each do |friend|
        json.set! friend.id do 
            json.extract! friend, :id, :first_name, :last_name
            json.profile_photo_url friend.profile_photo.attached? ? friend.profile_photo.url : nil
            json.cover_photo_url friend.cover_photo.attached? ? friend.cover_photo.url : nil
        end
    end
end
# for posts reducer
json.posts do 
    wall_posts.includes(:author).each do |post|
        json.set! post.id do
            json.extract! post, :id, :body, :user_wall_id, :author_id, :created_at, :updated_at
            json.author do
                json.extract! post.author, :id, :first_name, :last_name
                json.profile_photo_url post.author.profile_photo.attached? ? post.author.profile_photo.url : nil
            end
        end
    end
end



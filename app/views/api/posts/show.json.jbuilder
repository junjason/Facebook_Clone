json.extract! @post, :id, :body, :user_wall_id, :author_id, :created_at, :updated_at
json.author do
    json.extract! @post.author, :id, :first_name, :last_name
    json.profile_photo_url @post.author.profile_photo.attached? ? @post.author.profile_photo.url : nil
end
json.user_wall do
    json.extract! @post.user_wall, :id, :first_name, :last_name
    json.profile_photo_url @post.user_wall.profile_photo.attached? ? @post.user_wall.profile_photo.url : nil
end
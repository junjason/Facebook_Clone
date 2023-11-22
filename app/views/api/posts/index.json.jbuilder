# @posts.each do |post|
#     json.set! post.id do 
#         json.extract! post, :body, :author_id, :user_wall_id, :created_at, :updated_at
#     end
# end
json.posts do 
    @posts.each do |post|
        json.set! post.id do
            json.extract! post, :id, :body, :user_wall_id, :author_id, :created_at, :updated_at
            json.author do
                json.extract! post.author, :id, :first_name, :last_name
                json.profile_photo_url post.author.profile_photo.attached? ? post.author.profile_photo.url : nil
            end
            json.user_wall do
                json.extract! post.user_wall, :id, :first_name, :last_name
                json.profile_photo_url post.user_wall.profile_photo.attached? ? post.user_wall.profile_photo.url : nil
            end
        end
    end
    json.post_ids @posts.sort_by(&:created_at).reverse.pluck(:id).uniq
end
@posts.each do |post|
    json.set! post.id do 
        json.extract! post, :body, :author_id, :user_wall_id, :created_at
    end
end
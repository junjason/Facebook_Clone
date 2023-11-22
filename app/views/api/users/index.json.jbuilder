json.users do
    @users.each do |user|
        json.set! user.id do 
            json.extract! user, :id, :first_name, :last_name
            json.photoUrl user.profile_photo.attached? ? user.profile_photo.url : nil
        end
    end
end
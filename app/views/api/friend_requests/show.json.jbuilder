# friend_requests_sent = @user.sent_friend_requests
# friend_requests_sent_ids = friend_requests_sent.pluck(:id)
# friend_requests_received = @user.received_friend_requests
# friend_requests_received_ids = friend_requests_received.pluck(:id)

# # for friend_requests reducer
# json.friend_requests do 
#     friend_requests_sent.each do |friend_requests_sent|
#         json.set! friend_requests_sent.id do 
#             json.extract! friend_requests_sent, :id, :requester_id, :recipient_id
#         end 
#     end
#     friend_requests_received.each do |friend_requests_received|
#         json.set! friend_requests_received.id do 
#             json.extract! friend_requests_received, :id, :requester_id, :recipient_id
#         end 
#     end
# end

# app/views/api/friend_requests/show.json.jbuilder

json.extract! @friend_request, :id, :requester_id, :recipient_id, :status, :created_at, :updated_at
json.requester do
    json.extract! @friend_request.requester, :id, :first_name, :last_name
    json.profile_photo_url @friend_request.requester.profile_photo.attached? ? @friend_request.requester.profile_photo.url : nil
end
json.recipient do
    json.extract! @friend_request.recipient, :id, :first_name, :last_name
    json.profile_photo_url @friend_request.recipient.profile_photo.attached? ? @friend_request.recipient.profile_photo.url : nil
end

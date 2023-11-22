class Api::FriendRequestsController < ApplicationController  
    before_action :require_logged_in, only: [:create, :update, :destroy]
    def create
        existing_request = FriendRequest.find_by(friend_request_params)
    
        if existing_request
          render json: { message: "Friend request already exists" }, status: 200
        else
          @friend_request = FriendRequest.new(friend_request_params)
          @user = User.find_by(id: @friend_request.requester_id)
    
          if @friend_request.save
            render 'api/users/show'
          else
            render json: { error: @friend_request.errors.full_messages }, status: 422
          end
        end
      end
  
    # called when recipient accepts from friend request
    def update
        # @current_user = current_user
        @friend_request = FriendRequest.find(params[:id])
        if @friend_request
            @user = User.find_by(id: @friend_request.requester_id)

            Friend.create(user_id: @friend_request.recipient_id, friend_id: @friend_request.requester_id)
            Friend.create(user_id: @friend_request.requester_id, friend_id: @friend_request.recipient_id)

            @friend_request.destroy

            render 'api/users/show'
        else
            render json: {"error": "Friend request not found"}, status: 422;
        end
    end
  
    def destroy
        @friend_request = FriendRequest.find(params[:id])
  
        if @friend_request
            @user = User.find_by(id: @friend_request.requester_id)
            @friend_request.destroy
            render 'api/users/show'
        else
            render json: {"error": "Friend request not found"}, status: 422;
        end
    end

    private 
    def friend_request_params
        params.require(:friend_request).permit(:requester_id, :recipient_id)
    end
end

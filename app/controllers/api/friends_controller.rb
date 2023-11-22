class Api::FriendsController < ApplicationController  
    def create
        friend = Friend.new(friend_params)
        if friend.save
            render json: friend
        else
            render json: friend.errors.full_messages, status: 422
        end
    end
  
    def destroy
        @friend = Friend.find_by(id: params[:id])
        puts "friend!!!!"
        p @friend
      
        if @friend
          friend_1_id = @friend.friend_id
          friend_2_id = @friend.user_id
      
          friendship_1 = Friend.find_by(user_id: friend_1_id, friend_id: friend_2_id)
        #   friendship_2 = Friend.find_by(user_id: friend_2_id, friend_id: friend_1_id)
      
          @friend.destroy
          friendship_1.destroy
        #   friendship_2.destroy
      
          head :ok
        else
          render json: { error: "Friendship doesn't exist" }, status: 404
        end
    end

    private 
    def friend_params
        params.require(:friend).permit(:user_id, :friend_id)
    end
end
class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password']

    def create
      @user = User.new(user_params)
      # puts "logging params"
      p params
      puts "logging user_params"
      p user_params
      p @user
      if @user.save
        login!(@user)
        render :show
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :birthday, :gender, :password)
    end
end
  
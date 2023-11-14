class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password']

    def create
      @user = User.new(user_params)
      if @user.save
        login!(@user)
        render :show # is this needed? you redirect to index page on front-end
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def index 
      @users = User.all
      render :index
    end
  
    def show 
      @user = User.find(params[:id])
      render :show
    end

    private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :birthday, :gender, :password)
    end
end
  
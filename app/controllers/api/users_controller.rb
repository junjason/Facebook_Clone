class Api::UsersController < ApplicationController
    before_action :authenticate_user!
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

    def update
      @user = User.find(params[:id])
      if @user.update(user_params)
        render :show
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def search
      search_query = "%#{params[:search].downcase}%"
      @users = User.where("lower(first_name) LIKE ? OR lower(last_name) LIKE ?", search_query, search_query).limit(6)
      render :index
    end

    private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :birthday, :gender, :password, :bio)
    end
end
  
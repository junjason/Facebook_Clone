class Api::PostsController < ApplicationController
    wrap_parameters include: Post.attribute_names + ['author_id'] + ['user_wall_id']

    def create
      @post = Post.new(post_params)
      if @post.save
        render :show 
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def index 
      @posts = Post.all
      render :index
    end
  
    def show 
      @post = Post.find(params[:id])
      render :show
    end

    def update
      @post = Post.find(params[:id])
      if @post.update(post_params)
        render :show
      else
        render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
        post = Post.find_by(id: params[:id])
        if post 
            post.destroy
        else 
            render json: {'error': "Post doesn't exist"}, status: 404
        end
    end

    private

    def post_params
      params.require(:post).permit(:body, :author_id, :user_wall_id)
    end
end
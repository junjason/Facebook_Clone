class Api::PostsController < ApplicationController
    wrap_parameters include: Post.attribute_names + ['author_id'] + ['user_wall_id']

    def create
      @post = Post.new(post_params)
      if @post.save
        @user = User.find(@post.user_wall_id)
        # render 'api/users/show'
        render :show
      else
        render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def index 
      @current_user = current_user

      # Get posts on the current user's wall
      wall_posts = @current_user.wall_posts.includes(:author, :user_wall).order(created_at: :desc)

      # Get posts created by the current user
      user_posts = @current_user.posts_created.includes(:author, :user_wall).order(created_at: :desc)

      # Get posts on the walls of the current user's friends and friend's posts on other's walls
      friend_posts = Post.joins(author: :friends)
                        .where('users.id IN (?) OR posts.user_wall_id = ?', @current_user.friends.pluck(:id), @current_user.id)
                        .includes(:author, :user_wall)
                        .order('posts.created_at DESC')

      # Combine and sort all relevant posts
      @posts = (wall_posts + user_posts + friend_posts)
      render :index
    end
  
    def show 
      @post = Post.find(params[:id]).includes(:author, :user_wall)
      render :show
    end

    def update
      @post = Post.find(params[:id])
      if @post.update(post_params)
        @user = User.find(@post.user_wall_id)
        # render 'api/users/show'
        render :show
      else
        render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
        @post = Post.find_by(id: params[:id])
        if @post
            @user = User.find(@post.user_wall_id) 
            @post.destroy
            # render 'api/users/show'
            render :show
        else 
            render json: {'error': "Post doesn't exist"}, status: 404
        end
    end

    private

    def post_params
      params.require(:post).permit(:body, :author_id, :user_wall_id)
    end
end
class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.text :body, null:false
      t.references :author, null:false, foreign_key: { to_table: :users }
      t.references :user_wall, null:false, foreign_key: { to_table: :users }
      t.timestamps
    end
    # add_index :posts, :author_id
    # add_index :posts, :user_wall_id
  end
end

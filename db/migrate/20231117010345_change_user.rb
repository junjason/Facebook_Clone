class ChangeUser < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :gender
    add_column :users, :gender, :string

    remove_column :users, :email
    add_column :users, :email, :string
  end
end

class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :first_name, null:false
      t.string :last_name, null:false
      t.string :email, null:false
      t.string :phone_number
      t.date :birthday, null:false
      t.string :gender, null:false
      t.string :password_digest, null:false
      t.string :session_token, null:false
      t.timestamps
    end

    add_index :users, :first_name
    add_index :users, :last_name
    add_index :users, :email, unique: true
    add_index :users, :phone_number, unique: true
    add_index :users, :session_token, unique: true
  end
end

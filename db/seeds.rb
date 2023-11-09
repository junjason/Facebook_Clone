# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create demo user:
    User.create!(
        first_name: 'Jason', 
        last_name: 'Jun',
        email: 'jason@gmail.com',
        phone_number: '555-555-5555',
        birthday: Faker::Date.between(from: '1990-01-01', to: '2023-11-11'),
        gender: 'Male', 
        password: 'password'
    )
  
    # More users
    10.times do 
        name = Faker::Name.unique.name;
        names = name.split(' ');
        first_name = names[0];
        last_name = names[-1];
        User.create!({
            first_name: first_name,
            last_name: last_name,
            email: Faker::Internet.unique.email,
            phone_number: Faker::PhoneNumber.unique.cell_phone,
            birthday: Faker::Date.between(from: '1990-01-01', to: '2023-11-11'),
            gender: Faker::Gender.type,
            password: 'password'
        }) 
    end
  
    puts "Done!"
  end
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
        birthday: Faker::Date.between(from: '1990-01-01', to: '2010-11-11'),
        gender: 'Male', 
        password: 'password'
    )
  
    # More users
    20.times do 
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
            gender: Faker::Gender.binary_type,
            password: 'password'
        }) 
    end

    # More users
    4.times do 
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
  
    puts "Creating friends..."
    # 25 users = 25 users * 24 possible friends = 600 connections
    150.times do 
        # get random number from 1 to 25
        # get another random number from 1 to 25 
            # if rand1 != rand2, i.e. different users, generate new rand2 number
            # and
            # if friend where friend_id: {user_id: rand1, friend_id: rand2} does not exist
                # create friend where user_id = rand1 and friend_id = rand2
                # and 
                # create friend where user_id = rand2 and friend_id = rand1
        friend_id_1 = rand(1..25)
        friend_id_2 = rand(1..25)
        if friend_id_1 == friend_id_2
            while friend_id_1 == friend_id_2
                friend_id_2 = rand(1..25)
            end
        end
        if Friend.where(:user_id => friend_id_1, :friend_id => friend_id_2).blank?
            Friend.create!(user_id: friend_id_1, friend_id: friend_id_2)
            Friend.create!(user_id: friend_id_2, friend_id: friend_id_1)
        end
    end

    puts "Creating posts..."
    100.times do 
        author_id = rand(1..25)
        user_wall_id = rand(1..25)
        if Post.where(:author_id => author_id, :user_wall_id => user_wall_id).blank?
            Post.create!(body: Faker::Lorem.paragraph(sentence_count: 2, supplemental: true, random_sentences_to_add: 4),
            author_id: author_id, user_wall_id: user_wall_id)
        end
    end

    puts "Done!"
  end
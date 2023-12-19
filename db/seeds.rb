# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require "open-uri"

# ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Friend.destroy_all
    Post.destroy_all
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create demo user:
    User.create!(
        first_name: 'Buddy', 
        last_name: 'The Elf',
        email: 'buddy@gmail.com',
        phone_number: '555-555-5555',
        birthday: Faker::Date.between(from: '1990-01-01', to: '2010-11-11'),
        gender: 'Male', 
        password: 'password'
    )
  
    User.create!(
        first_name: 'Papa', 
        last_name: 'Elf',
        email: 'papaelf@gmail.com',
        phone_number: '555-555-6666',
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
    3.times do 
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

    User.create!(
        first_name: 'Santa', 
        last_name: 'Claus',
        email: 'santa@gmail.com',
        phone_number: '555-555-6667',
        birthday: Faker::Date.between(from: '1990-01-01', to: '2010-11-11'),
        gender: 'Male', 
        password: 'password'
    )

    # add photos to all users
    users = User.all
    # users.each do |user|
    #     user.profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/santa.png"), filename:"santa.png")
    # end
    users[0].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_1_pf.png"), filename:"elf_1_pf.png")
    users[1].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_2_pf.png"), filename:"elf_2_pf.png")
    users[2].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_3_pf.png"), filename:"elf_3_pf.png")
    users[3].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_4_pf.png"), filename:"elf_4_pf.png")
    users[4].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_5_pf.png"), filename:"elf_5_pf.png")
    users[5].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_6_pf.png"), filename:"elf_6_pf.png")
    users[6].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_7_pf.png"), filename:"elf_7_pf.png")
    users[7].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_8_pf.png"), filename:"elf_8_pf.png")
    users[8].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_9_pf.png"), filename:"elf_9_pf.png")
    users[9].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_10_pf.png"), filename:"elf_10_pf.png")
    users[10].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_11_pf.png"), filename:"elf_11_pf.png")
    users[11].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_12_pf.png"), filename:"elf_12_pf.png")
    users[12].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_13_pf.png"), filename:"elf_13_pf.png")
    users[13].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_14_pf.png"), filename:"elf_14_pf.png")
    users[14].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_15_pf.png"), filename:"elf_15_pf.png")
    users[15].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_16_pf.png"), filename:"elf_16_pf.png")
    users[16].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_17_pf.png"), filename:"elf_17_pf.png")
    users[17].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_18_pf.png"), filename:"elf_18_pf.png")
    users[18].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_19_pf.png"), filename:"elf_19_pf.png")
    users[19].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_20_pf.png"), filename:"elf_20_pf.png")
    users[20].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_21_pf.png"), filename:"elf_21_pf.png")
    users[21].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_22_pf.png"), filename:"elf_22_pf.png")
    users[22].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_23_pf.png"), filename:"elf_23_pf.png")
    users[23].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_24_pf.png"), filename:"elf_24_pf.png")
    users[24].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/elf_25_pf.png"), filename:"elf_25_pf.png")
    users[25].profile_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/santa.png"), filename:"santa.png")
    
    users[0].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-1.png"), filename:"cover-photo-1.png")
    users[1].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-2.png"), filename:"cover-photo-2.png")
    users[2].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-3.png"), filename:"cover-photo-3.png")
    users[3].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-4.png"), filename:"cover-photo-4.png")
    users[4].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-5.png"), filename:"cover-photo-5.png")
    users[5].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-6.png"), filename:"cover-photo-6.png")
    users[6].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-1.png"), filename:"cover-photo-1.png")
    users[7].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-2.png"), filename:"cover-photo-2.png")
    users[8].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-9.png"), filename:"cover-photo-9.png")
    users[9].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-10.png"), filename:"cover-photo-10.png")
    users[10].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-11.png"), filename:"cover-photo-11.png")
    users[11].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-1.png"), filename:"cover-photo-1.png")
    users[12].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-2.png"), filename:"cover-photo-2.png")
    users[13].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-3.png"), filename:"cover-photo-3.png")
    users[14].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-4.png"), filename:"cover-photo-4.png")
    users[15].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-5.png"), filename:"cover-photo-5.png")
    users[16].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-6.png"), filename:"cover-photo-6.png")
    users[17].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-11.png"), filename:"cover-photo-11.png")
    users[18].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-2.png"), filename:"cover-photo-2.png")
    users[19].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-11.png"), filename:"cover-photo-11.png")
    users[20].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-10.png"), filename:"cover-photo-10.png")
    users[21].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-5.png"), filename:"cover-photo-5.png")
    users[22].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-1.png"), filename:"cover-photo-1.png")
    users[23].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-2.png"), filename:"cover-photo-2.png")
    users[24].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-2.png"), filename:"cover-photo-2.png")
    users[25].cover_photo.attach(io: URI.open("https://facebook-seeds.s3.amazonaws.com/seed_images/cover-photo-3.png"), filename:"cover-photo-3.png")
   
  
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
        friend_id_1 = rand(1..26)
        friend_id_2 = rand(1..26)
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
    # 250.times do 
    #     author_id = rand(1..26)
    #     user_wall_id = rand(1..26)
    #     if Post.where(:author_id => author_id, :user_wall_id => user_wall_id).blank?
    #         Post.create!(body: Faker::Lorem.paragraph(sentence_count: 2, supplemental: true, random_sentences_to_add: 4),
    #         author_id: author_id, user_wall_id: user_wall_id)
    #     end
    # end
    75.times do
        author_id = rand(1..26)
        user_wall_id = rand(1..26)
        unless Post.exists?(author_id: author_id, user_wall_id: user_wall_id)
            Post.create!(
                body: "Merry Christmas! #{Faker::Lorem.paragraph(sentence_count: 2, supplemental: true, random_sentences_to_add: 4)}",
                author_id: author_id,
                user_wall_id: user_wall_id
            )
        end
    end

    puts "Done!"
#   end
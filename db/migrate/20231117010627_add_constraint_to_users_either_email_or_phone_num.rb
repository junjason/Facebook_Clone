class AddConstraintToUsersEitherEmailOrPhoneNum < ActiveRecord::Migration[7.0]
  def change
    reversible do |dir|
      dir.up do
        execute <<-SQL
          ALTER TABLE users
          ADD CONSTRAINT email_or_phone_required
          CHECK (email IS NOT NULL OR phone_number IS NOT NULL);
        SQL
      end

      dir.down do
        execute <<-SQL
          ALTER TABLE users
          DROP CONSTRAINT IF EXISTS email_or_phone_required;
        SQL
      end
    end
  end
end

class CreateContactMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :contact_messages do |t|

      t.string :name
      t.string :email
      t.text :text

      t.timestamps
    end
  end
end

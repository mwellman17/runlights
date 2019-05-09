class CreateShows < ActiveRecord::Migration[5.2]
  def change
    create_table :shows do |t|
      t.string :name, null: false
      t.belongs_to :user, null: false

      t.timestamps
    end
  end
end

class CreateFixtures < ActiveRecord::Migration[5.2]
  def change
    create_table :fixtures do |t|
      t.string :name, null: false
      t.string :short_name
      t.text :manual
      t.float :weight
      t.integer :wattage
      t.belongs_to :manufacturer

      t.timestamps
    end
  end
end

class CreateInstruments < ActiveRecord::Migration[5.2]
  def change
    create_table :instruments do |t|
      t.belongs_to :fixture, null: false
      t.belongs_to :mode, null: false
      t.belongs_to :show, null: false
      t.string :purpose
      t.integer :channel
      t.integer :address
      t.string :circuit
      t.string :accessory
      t.string :color
      t.string :gobo
      t.belongs_to :position
      t.float :unit_number

      t.timestamps
    end
  end
end

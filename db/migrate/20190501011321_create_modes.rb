class CreateModes < ActiveRecord::Migration[5.2]
  def change
    create_table :modes do |t|
      t.string :name, null: false
      t.string :short_name
      t.integer :footprint, null: false, :default => 1
      t.belongs_to :fixture

      t.timestamps
    end
  end
end

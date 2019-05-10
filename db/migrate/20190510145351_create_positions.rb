class CreatePositions < ActiveRecord::Migration[5.2]
  def change
    create_table :positions do |t|
      t.belongs_to :show, null: false
      t.string :name, null: false

      t.timestamps
    end
  end
end

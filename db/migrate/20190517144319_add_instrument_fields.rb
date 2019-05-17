class AddInstrumentFields < ActiveRecord::Migration[5.2]
  def up
    add_column :instruments, :universe, :integer
    add_column :instruments, :circuit_number, :integer
    rename_column :instruments, :circuit, :circuit_name
    drop_table :positions
  end

  def down
    remove_column :instruments, :universe
    remove_column :instruments, :circuit_number
    rename_column :instruments, :circuit_name, :circuit
    create_table :positions do |t|
      t.belongs_to :show, null: false
      t.string :name, null: false

      t.timestamps
    end
  end
end

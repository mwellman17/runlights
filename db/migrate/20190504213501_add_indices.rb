class AddIndices < ActiveRecord::Migration[5.2]
  def change
    add_index :manufacturers, :name
    add_index :fixtures, :name
  end
end

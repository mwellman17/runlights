class AddPosition < ActiveRecord::Migration[5.2]
  def change
    add_column :instruments, :position, :string
  end
end

class AddPublicShow < ActiveRecord::Migration[6.1]
  def change
    add_column :shows, :shareable, :boolean, default: false
  end
end

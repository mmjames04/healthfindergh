class AddColumnToFacilities < ActiveRecord::Migration
  def change
    add_column :facilities, :photo, :string
  end
end

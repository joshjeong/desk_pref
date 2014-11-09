class CreateDesks < ActiveRecord::Migration
  def change
    create_table :desks do |t|
      t.string :style
      t.integer :price
      t.text :description
      t.timestamps
    end
  end
end

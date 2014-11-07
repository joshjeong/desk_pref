class CreateDesks < ActiveRecord::Migration
  def change
    create_table :desks do |t|
      t.belongs_to :user
      t.string :type
      t.integer :price

      t.timestamps
    end
  end
end

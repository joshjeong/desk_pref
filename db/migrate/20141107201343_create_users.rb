class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.boolean :admin
      t.string :desk_type
      
      t.timestamps
    end
  end
end

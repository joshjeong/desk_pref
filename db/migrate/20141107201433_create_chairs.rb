class CreateChairs < ActiveRecord::Migration
  def change
    create_table :chairs do |t|

      t.timestamps
    end
  end
end

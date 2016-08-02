class CreateWidgets < ActiveRecord::Migration[5.0]
  def change
    create_table :widgets do |t|
      t.references :dashboard, :null => false
      t.integer    :row, :null => false, :limit => 2
      t.integer    :pos, :null => false, :limit => 2
      t.text       :name, :null => false
      t.text       :description, :null => false
      t.text       :type, :null => false
      t.text       :size, :null => false
      t.text       :units, :null => false
      t.jsonb      :options, :null => true
      t.timestamps
    end
  end
end

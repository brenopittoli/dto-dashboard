# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160728011053) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "agencies", force: :cascade do |t|
    t.text     "name",        null: false
    t.text     "url",         null: false
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "dashboards", force: :cascade do |t|
    t.integer  "agency_id",  null: false
    t.text     "name",       null: false
    t.text     "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["agency_id"], name: "index_dashboards_on_agency_id", using: :btree
  end

  create_table "datapoints", force: :cascade do |t|
    t.integer  "dataset_id", null: false
    t.datetime "ts",         null: false
    t.decimal  "value",      null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["dataset_id"], name: "index_datapoints_on_dataset_id", using: :btree
  end

  create_table "dataset_widgets", force: :cascade do |t|
    t.integer  "dataset_id", null: false
    t.integer  "widget_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["dataset_id"], name: "index_dataset_widgets_on_dataset_id", using: :btree
    t.index ["widget_id"], name: "index_dataset_widgets_on_widget_id", using: :btree
  end

  create_table "datasets", force: :cascade do |t|
    t.integer  "agency_id",  null: false
    t.text     "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["agency_id"], name: "index_datasets_on_agency_id", using: :btree
  end

  create_table "widgets", force: :cascade do |t|
    t.integer  "dashboard_id",           null: false
    t.integer  "row",          limit: 2, null: false
    t.integer  "pos",          limit: 2, null: false
    t.text     "name",                   null: false
    t.text     "description",            null: false
    t.text     "type",                   null: false
    t.text     "size",                   null: false
    t.text     "units",                  null: false
    t.jsonb    "options"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.index ["dashboard_id"], name: "index_widgets_on_dashboard_id", using: :btree
  end

end

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_07_03_215212) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "favorites", force: :cascade do |t|
    t.bigint "fixture_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["fixture_id"], name: "index_favorites_on_fixture_id"
    t.index ["user_id"], name: "index_favorites_on_user_id"
  end

  create_table "fixtures", force: :cascade do |t|
    t.string "name", null: false
    t.string "short_name", null: false
    t.text "manual"
    t.float "weight"
    t.integer "wattage"
    t.bigint "manufacturer_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["manufacturer_id"], name: "index_fixtures_on_manufacturer_id"
    t.index ["name"], name: "index_fixtures_on_name"
    t.index ["user_id"], name: "index_fixtures_on_user_id"
  end

  create_table "instruments", force: :cascade do |t|
    t.bigint "fixture_id", null: false
    t.bigint "mode_id", null: false
    t.bigint "show_id", null: false
    t.string "purpose"
    t.integer "channel"
    t.integer "address"
    t.string "circuit_name"
    t.string "accessory"
    t.string "color"
    t.string "gobo"
    t.bigint "position_id"
    t.float "unit_number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "position"
    t.integer "universe"
    t.integer "circuit_number"
    t.index ["fixture_id"], name: "index_instruments_on_fixture_id"
    t.index ["mode_id"], name: "index_instruments_on_mode_id"
    t.index ["position_id"], name: "index_instruments_on_position_id"
    t.index ["show_id"], name: "index_instruments_on_show_id"
  end

  create_table "manufacturers", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_manufacturers_on_name"
  end

  create_table "modes", force: :cascade do |t|
    t.string "name", default: "default", null: false
    t.string "short_name", default: "default", null: false
    t.integer "footprint", default: 1, null: false
    t.bigint "fixture_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["fixture_id"], name: "index_modes_on_fixture_id"
  end

  create_table "shows", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "shareable", default: false
    t.index ["user_id"], name: "index_shows_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", default: "", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end

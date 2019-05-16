class Api::V1::FixturesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :search]
  protect_from_forgery unless: -> { request.format.json? }
  serialization_scope :current_user

  def user_id
    if current_user.nil?
      ""
    else
      current_user[:id]
    end
  end

  def index
    manufacturers = Manufacturer.all.order(name: :asc)
    user_fixtures = nil
    if current_user
      user_fixtures = User.find(user_id).fixtures.order(name: :asc)
      render json: {
        manufacturers: ActiveModel::Serializer::CollectionSerializer.new(manufacturers, serializer: ManufacturerSerializer, current_user: current_user.id),
        user_fixtures: ActiveModel::Serializer::CollectionSerializer.new(user_fixtures, serializer: UserFixtureSerializer, current_user: current_user.id),
        user_id: user_id
      }
    else
      render json: Manufacturer.all.order(name: :asc)
    end
  end

  def search
    manufacturers = (Manufacturer.includes(:fixtures).where("fixtures.name ILIKE ?", "%#{params['search_string']}%").references(:fixtures) + Manufacturer.where("name ILIKE ?", "%#{params['search_string']}%")).uniq
    render json: ActiveModel::Serializer::CollectionSerializer.new(manufacturers, serializer: ManufacturerSerializer, current_user: current_user)
  end

  def create
    response = JSON.parse(request.body.read)
    user_id = User.find(response['user'])
    fixture_attributes = {
      name: response['name'],
      short_name: response['name'].gsub(' ', ''),
      wattage: response['wattage'].to_i,
      weight: response['weight'].to_i * 0.453592,
      manual: response['manual'],
      user: user_id
    }
    fixture = Fixture.new(fixture_attributes)
    if fixture.save
      Favorite.create({ user: fixture.user, fixture: fixture })
      if response['modes'].length == 0
        mode_attributes = {
          name: "default",
          short_name: "default",
          footprint: 1,
          fixture: fixture
        }
        Mode.create(mode_attributes)
      else
        response['modes'].each do |mode|
          if mode['name'] == ""
            mode_name = "default"
          else
            mode_name = mode['name']
          end
          if mode['footprint'] == ""
            footprint = 1
          else
            footprint = mode['footprint']
          end
          mode_attributes = {
            name: mode_name,
            short_name: mode_name.gsub(' ', ''),
            footprint: footprint,
            fixture: fixture
          }
          Mode.create(mode_attributes)
        end
      end
      render json: fixture, serializer: UserFixtureSerializer
    else
      render json: { error: fixture.errors.full_messages.join(', ') }
    end
  end

  def update
    response = JSON.parse(request.body.read)
    fixture = Fixture.find(response['fixtureDetails']['id'])
    fixture.name = response['fixtureDetails']['name']
    fixture.short_name = response['fixtureDetails']['name'].gsub(' ', '')
    fixture.wattage = response['fixtureDetails']['wattage']
    fixture.weight = response['fixtureDetails']['weight'].to_i * 0.453592
    fixture.manual = response['fixtureDetails']['manual']
    if fixture.save
      response['fixtureDetails']['modes'].each do |mode|
        if mode['id']
          old_mode = Mode.find(mode['id'])
          old_mode.name = mode['name']
          old_mode.short_name = mode['name'].gsub(' ', '')
          old_mode.footprint = mode['footprint']
          old_mode.save
        else
          if mode['name'] == ""
            mode_name = "default"
          else
            mode_name = mode['name']
          end
          if mode['footprint'] == ""
            footprint = 1
          else
            footprint = mode['footprint']
          end
          mode_attributes = {
            name: mode_name,
            short_name: mode_name.gsub(' ', ''),
            footprint: footprint,
            fixture: fixture
          }
          Mode.create(mode_attributes)
        end
      end
      render json: fixture, serializer: UserFixtureSerializer, current_user: response['user']
    else
      render json: { error: fixture.errors.full_messages.join(', ') }
    end
  end

  def destroy
    if Fixture.exists?(params['fixture_id'])
      fixture = Fixture.find(params['fixture_id'])
      fixture.destroy
      render json: fixture
    else
      render json: { error: "An error occurred." }
    end
  end
end

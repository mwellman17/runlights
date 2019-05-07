class Api::V1::FixturesController < ApplicationController
  serialization_scope :current_user
  protect_from_forgery unless: -> { request.format.json? }

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
      user_fixtures = User.find(user_id).fixtures
    end
    render json: {
      manufacturers: ActiveModel::SerializableResource.new(manufacturers),
      user_fixtures: ActiveModel::SerializableResource.new(user_fixtures),
      user_id: user_id
    }
  end

  def search
    manufacturers = (Manufacturer.includes(:fixtures).where("fixtures.name ILIKE ?", "%#{params['search_string']}%").references(:fixtures) + Manufacturer.where("name ILIKE ?", "%#{params['search_string']}%")).uniq
    render json: manufacturers
  end

  def create
    response = JSON.parse(request.body.read)
    user_id = User.find(response['user'])
    fixture_attributes = {
      name: response['name'],
      short_name: response['name'].gsub(' ', ''),
      wattage: response['wattage'],
      weight: response['weight'],
      manual: response['manual'],
      user: user_id
    }
    fixture = Fixture.new(fixture_attributes)
    if fixture.save
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
      render json: fixture, serializer: FixtureSerializer
    else
      render json: { error: fixture.errors.full_messages.join(', ') }
    end
  end
end

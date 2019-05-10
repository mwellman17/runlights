class Api::V1::ShowsController < ApplicationController
  before_action :authenticate_user!, except: []
  protect_from_forgery unless: -> { request.format.json? }
  serialization_scope :current_user

  def show
    if Show.exists?(params[:id])
      show = Show.find(params[:id])
      if current_user.shows.includes(show)
        fixtures = []
        current_user.favorites.each do |favorite|
          fixtures << Fixture.find(favorite.fixture_id)
        end
        instruments = show.instruments
        render json: {
          user: ActiveModelSerializers::SerializableResource.new(current_user),
          show: ActiveModelSerializers::SerializableResource.new(show),
          fixtures: ActiveModel::Serializer::CollectionSerializer.new(fixtures, serializer: FixturePickerSerializer),
          instruments: ActiveModel::Serializer::CollectionSerializer.new(instruments, serializer: InstrumentSerializer)
        }
      else
        render json: { error: "You do not have access to this show."}
      end
    else
      render json: { error: "Not found."}
    end
  end

  def create
    response = JSON.parse(request.body.read)
    name = response['name']
    user = User.find(response['user'])
    show = Show.new({ user: user, name: name })
    if show.save
      render json: show
    else
      render json: { error: show.errors.full_messages.join(', ') }
    end
  end
end

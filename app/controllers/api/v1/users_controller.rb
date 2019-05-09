class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!, except: [:index]
  protect_from_forgery unless: -> { request.format.json? }
  serialization_scope :current_user

  def index
    if current_user.nil?
      render json: { user: false }
    else
      fixtures = []
      current_user.favorites.each do |favorite|
        fixtures << Fixture.find(favorite.fixture_id)
      end
      render json: {
        user: {
          user_id: current_user.id,
          username: current_user.username,
          favorites: ActiveModel::Serializer::CollectionSerializer.new(fixtures, each_serializer: FixtureSerializer, current_user: current_user),
          shows: ActiveModel::Serializer::CollectionSerializer.new(current_user.shows, each_serializer: ShowSerializer)
        }
      }
    end
  end
end

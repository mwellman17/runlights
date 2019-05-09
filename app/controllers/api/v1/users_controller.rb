class Api::V1::UsersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!, except: [:index]
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
          favorites: ActiveModel::Serializer::CollectionSerializer.new(fixtures, each_serializer: FixtureSerializer, current_user: current_user)
        }
      }
    end
  end
end

class Api::V1::FavoritesController < ApplicationController

  def create
    response = JSON.parse(request.body.read)
    fixture = Fixture.find(response['fixture_id'])
    user = User.find(response['user_id'])
    old_favorite = Favorite.where(user: user, fixture: fixture)
    if old_favorite.length == 0
      favorite = Favorite.new({ user: user, fixture: fixture })
      if favorite.save
        render json: favorite
      else
        render json: { error: favorite.errors.full_messages.join(', ') }
      end
    else
      old_favorite.destroy_all
      render json: old_favorite[0]
    end
  end
end

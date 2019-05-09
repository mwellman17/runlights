class Api::V1::ShowsController < ApplicationController
  before_action :authenticate_user!, except: []
  protect_from_forgery unless: -> { request.format.json? }
  serialization_scope :current_user

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

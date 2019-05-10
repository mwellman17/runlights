class Api::V1::InstrumentsController < ApplicationController
  before_action :authenticate_user!, except: []
  protect_from_forgery unless: -> { request.format.json? }
  serialization_scope :current_user

  def create
    response = JSON.parse(request.body.read)
    instruments = []
    if show.save
      render json: instruments
    else
      render json: { error: show.errors.full_messages.join(', ') }
    end
  end
end

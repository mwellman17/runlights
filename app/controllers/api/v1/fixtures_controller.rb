class Api::V1::FixturesController < ApplicationController
  def index
    render json: Manufacturer.all
  end
end

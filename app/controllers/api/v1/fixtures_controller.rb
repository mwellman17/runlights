class Api::V1::FixturesController < ApplicationController
  def index
    render json: Manufacturer.all.order(name: :asc)
  end
end

class Api::V1::FixturesController < ApplicationController
  serialization_scope :current_user
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Manufacturer.all.order(name: :asc)
  end

  def search
    manufacturers = (Manufacturer.includes(:fixtures).where("fixtures.name ILIKE ?", "%#{params['search_string']}%").references(:fixtures) + Manufacturer.where("name ILIKE ?", "%#{params['search_string']}%")).uniq
    render json: manufacturers
  end

end

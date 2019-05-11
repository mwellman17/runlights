class FixturesController < ApplicationController
  before_action :authenticate_user!, except: []

  def index
  end

  def new
  end
end

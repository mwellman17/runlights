class ShowsController < ApplicationController
  before_action :authenticate_user!, except: []

  def show
  end
end

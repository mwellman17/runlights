class UserFixtureSerializer < ActiveModel::Serializer
  attributes :id, :name, :short_name, :manual, :weight, :wattage, :mode_list, :creator, :favorite, :instrument_count, :show_names

  def instrument_count
    object.instruments.length
  end

  def show_names
    shows = []
    object.instruments.each do |instrument|
      shows << instrument.show.name
    end
    shows.uniq
  end

  def creator
    object.user.username
  end

  def favorite
    if @instance_options[:current_user]
      user = @instance_options[:current_user].id
      object.favorites.each do |item|
        if item.user_id == user
          return true
        end
      end
    end
    return false
  end
end

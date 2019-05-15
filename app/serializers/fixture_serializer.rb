class FixtureSerializer < ActiveModel::Serializer
  attributes :id, :name, :short_name, :manual, :weight, :wattage, :mode_list, :creator, :favorite

  def creator
    object.user.username
  end

  def favorite
    if @instance_options[:current_user]
      user = @instance_options[:current_user]
      object.favorites.each do |item|
        if item.user_id == user
          return true
        end
      end
    end
    return false
  end
end

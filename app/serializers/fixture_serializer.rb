class FixtureSerializer < ActiveModel::Serializer
  attributes :id, :name, :short_name, :manual, :weight, :wattage, :mode_list, :creator, :favorite

  def creator
    object.user.username
  end

  def favorite
    false
  end
end

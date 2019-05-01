class FixtureSerializer < ActiveModel::Serializer
  attributes :id, :name, :short_name, :manual, :weight, :wattage, :mode_list
end

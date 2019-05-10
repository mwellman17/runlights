class FixturePickerSerializer < ActiveModel::Serializer
  attributes :id, :name, :short_name
  has_many :modes
end

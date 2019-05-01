class ManufacturerSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :fixtures
end

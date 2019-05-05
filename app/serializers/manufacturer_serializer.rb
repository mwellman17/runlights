class ManufacturerSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :fixtures do
    object.fixtures.order(name: :asc)
  end
end

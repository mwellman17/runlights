class ManufacturerSerializer < ActiveModel::Serializer
  attributes :id, :name, :fixtures

  def fixtures
    object.fixtures.order(name: :asc)
  end
end

class InstrumentSerializer < ActiveModel::Serializer
  attributes :id, :fixture, :purpose, :channel, :universe, :address, :circuit_name, :circuit_number, :accessory, :color, :gobo, :position, :unit_number

  belongs_to :fixture
end

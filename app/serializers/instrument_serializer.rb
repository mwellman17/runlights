class InstrumentSerializer < ActiveModel::Serializer
  attributes :id, :fixture, :purpose, :channel, :address, :circuit, :accessory, :color, :gobo, :position, :unit_number
end
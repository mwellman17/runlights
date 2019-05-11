class Mode < ApplicationRecord
  validates :name, presence: true
  attribute :name, :string, default: "default"
  validates :short_name, presence: true
  attribute :short_name, :string, default: "default"
  validates :footprint, presence: true, numericality: { only_integer: true, greater_than: 0 }
  attribute :footprint, :integer, default: 1

  belongs_to :fixture
  has_many :instruments
end

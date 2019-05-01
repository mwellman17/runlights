class Mode < ApplicationRecord
  validates :name, presence: true
  validates :footprint, presence: true
  attribute :footprint, :integer, default: 1

  belongs_to :fixture
end

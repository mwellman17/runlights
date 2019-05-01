class Manufacturer < ApplicationRecord
  validates :name, presence: true

  has_many :fixtures
end

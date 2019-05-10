class Show < ApplicationRecord
  validates :name, presence: true
  
  belongs_to :user
  has_many :positions
  has_many :instruments
end

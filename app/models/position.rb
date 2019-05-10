class Position < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: [:show]}
  
  belongs_to :show
  has_many :instruments
end

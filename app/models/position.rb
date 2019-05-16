class Position < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: [:show]}

  belongs_to :show
end

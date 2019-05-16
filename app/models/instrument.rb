class Instrument < ApplicationRecord
  belongs_to :show
  belongs_to :fixture
  belongs_to :mode
  validates :channel,
    numericality: { only_integer: true, greater_than: 0 },
    allow_blank: true
  validates :address,
    numericality: { only_integer: true, greater_than: 0 },
    allow_blank: true
  validates :unit_number,
    numericality: true,
    allow_blank: true

  def footprint
    object.mode.footprint
  end
end

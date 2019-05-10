class Instrument < ApplicationRecord
  belongs_to :show
  belongs_to :fixture
  belongs_to :mode
  belongs_to :position, optional: true

  def footprint
    object.mode.footprint
  end
end

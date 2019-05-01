class Fixture < ApplicationRecord
  validates :name, presence: true

  belongs_to :manufacturer
  has_many :modes

  def mode_list
    display = {}
    self.modes.each do |mode|
      display[mode['name']] = mode['footprint']
    end
    return display
  end
end

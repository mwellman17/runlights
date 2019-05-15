class Fixture < ApplicationRecord
  validates :name, presence: true

  belongs_to :manufacturer, optional: true
  belongs_to :user
  has_many :modes, :dependent => :delete_all
  has_many :favorites, :dependent => :delete_all
  has_many :instruments, :dependent => :delete_all

  def mode_list
    display = {}
    self.modes.each do |mode|
      display[mode['name']] = mode['footprint']
    end
    return display
  end
end

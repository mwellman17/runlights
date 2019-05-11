class Show < ApplicationRecord
  validates :name, presence: true

  belongs_to :user
  has_many :positions, :dependent => :delete_all
  has_many :instruments, :dependent => :delete_all
end

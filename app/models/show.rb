class Show < ApplicationRecord
  validates :name, presence: true

  belongs_to :user
  has_many :instruments, :dependent => :delete_all

  def is_shareable?
    shareable
  end
end

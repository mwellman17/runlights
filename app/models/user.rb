class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :fixtures, :dependent => :delete_all
  has_many :favorites, :dependent => :delete_all
  has_many :shows, :dependent => :delete_all

  validates :username, presence: true, uniqueness: true
end

require 'rails_helper'

RSpec.describe Favorite, type: :model do
  it { should belong_to(:fixture) }
  it { should belong_to(:user) }
end

require 'rails_helper'

RSpec.describe Mode, type: :model do
  it { should belong_to(:fixture) }
  it { should have_many(:instruments) }

  it { should have_valid(:name).when("standard") }
  it { should_not have_valid(:name).when(nil,"") }

  it { should have_valid(:short_name).when("standard") }
  it { should_not have_valid(:short_name).when(nil,"") }

  it { should have_valid(:footprint).when(17) }
  it { should_not have_valid(:footprint).when(nil,"", "banana", 1.5, -6) }
end

require 'rails_helper'

RSpec.describe Fixture, type: :model do
  it { should belong_to(:user) }
  it { should have_many(:modes) }
  it { should have_many(:favorites) }
  it { should have_many(:instruments) }

  it { should have_valid(:name).when("VL 4000") }
  it { should_not have_valid(:name).when(nil,"") }
end

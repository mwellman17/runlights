require 'rails_helper'

RSpec.describe Instrument, type: :model do
  it { should have_valid(:channel).when(17) }
  it { should_not have_valid(:channel).when("banana") }

  it { should have_valid(:address).when(17) }
  it { should_not have_valid(:address).when("banana") }

  it { should have_valid(:unit_number).when(17) }
  it { should_not have_valid(:unit_number).when("banana") }
end

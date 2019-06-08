require 'rails_helper'

RSpec.describe Fixture, type: :model do
  it { should have_valid(:name).when("VL 4000") }
  it { should_not have_valid(:name).when(nil,"") }
end

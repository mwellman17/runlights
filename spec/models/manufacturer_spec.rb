require 'rails_helper'

RSpec.describe Manufacturer, type: :model do
  it { should have_many(:fixtures) }

  it { should have_valid(:name).when("Vari-Lite") }
  it { should_not have_valid(:name).when(nil,"") }
end

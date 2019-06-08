require 'rails_helper'

RSpec.describe Show, type: :model do
  it { should have_valid(:name).when("PAX East") }
  it { should_not have_valid(:name).when(nil,"") }
end

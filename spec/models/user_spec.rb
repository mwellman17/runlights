require 'rails_helper'

RSpec.describe User, type: :model do
  context 'when user has been created' do
    it 'has login information' do
      user_one = FactoryBot.create(:user)
      expect(User.first.username).to eq user_one.username
      expect(User.first.email).to eq user_one.email
    end
  end
end

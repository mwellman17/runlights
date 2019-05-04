Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  resources :fixtures, only: [:index]

  namespace :api do
    namespace :v1 do
      resources :fixtures, only: [:index]
      post 'fixtures/search', to: 'fixtures#search'
    end
  end
end

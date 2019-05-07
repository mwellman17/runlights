Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  resources :fixtures, only: [:index, :new]

  namespace :api do
    namespace :v1 do
      resources :fixtures, only: [:index, :create]
      post 'fixtures/search', to: 'fixtures#search'
    end
  end
end

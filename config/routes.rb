Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  resources :fixtures, only: [:index, :new]

  namespace :api do
    namespace :v1 do
      resources :fixtures, only: [:index, :create] do
        resources :favorites, only: [:create]
      end
      get 'current_user', to: 'users#index'
      post 'fixtures/search', to: 'fixtures#search'
    end
  end
end

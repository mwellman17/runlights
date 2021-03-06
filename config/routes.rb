Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  resources :fixtures, only: [:index]
  resources :shows, only: [:show]

  namespace :api do
    namespace :v1 do
      resources :instruments, only: [:create, :update, :destroy]
      resources :shows, only: [:show, :create, :update]
      resources :fixtures, only: [:index, :create, :update, :destroy] do
        resources :favorites, only: [:create]
      end
      get 'current_user', to: 'users#index'
      post 'fixtures/search', to: 'fixtures#search'
      get '/shows/:id/instruments',to: 'shows#instruments'
      get '/shows/:id/channels',to: 'shows#channels'
    end
  end
end

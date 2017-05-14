Rails.application.routes.draw do

  root to: 'static_pages#index'

  namespace :api, format: {default: :json} do
    resources :diagnosis, only: [:create, :show, :update]
    # get '/search' => 'symptoms#search', as: 'search'
    resources :symptoms, only: [:create, :index]
    resources :responses, only: [:create]
    resources :translations, only: [:create]
    resources :images, only: [:create]
  end

end

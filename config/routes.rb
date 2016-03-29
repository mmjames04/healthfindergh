Rails.application.routes.draw do

  post '/rate' => 'rater#create', :as => 'rate'
  root 'facilities#index'

  get "/auth/twitter/callback" => "sessions#create"
  get 'auth/failure', to: redirect('/')

  get "/signout" => "sessions#destroy", :as => :signout
  

  resources :reviews

  resources :users

  resources :doctors

  resources :facilities


end

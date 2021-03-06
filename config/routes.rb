Rails.application.routes.draw do

  root 'facilities#index'

  post '/rate' => 'rater#create', :as => 'rate'

  get "/auth/twitter/callback" => "sessions#create"
  get 'auth/failure', to: redirect('/')

  get "/signout" => "sessions#destroy", :as => :signout
  

  resources :reviews

  resources :users

  resources :doctors

  resources :facilities


end

Rails.application.routes.draw do
  devise_for :users
  namespace :v1, defaults: { format: 'json' } do
    resources :movies, only: [:index, :show]
    resources :credits, only: :show
    resources :persons, only: :show
    get 'acted/:id', to: 'persons#acted', as: :acted
  end
end
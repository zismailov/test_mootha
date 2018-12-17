Rails.application.routes.draw do
  namespace :v1, defaults: { format: 'json' } do
    resources :movies, only: [:index, :show]
    resources :credits, only: :show
    resources :persons, only: :show
    get 'acted/:id', to: 'persons#acted', as: :acted
  end
end
Rails.application.routes.draw do
  namespace :v1 do
    devise_for :users, controllers: { registrations: "v1/users/registrations", sessions: "v1/users/sessions", passwords: "devise/passwords" }
  end
  
  namespace :v1, defaults: { format: 'json' } do
    resources :movies, only: [:index, :show]
    resources :credits, only: :show
    resources :persons, only: :show
    get 'acted/:id', to: 'persons#acted', as: :acted
  end
end
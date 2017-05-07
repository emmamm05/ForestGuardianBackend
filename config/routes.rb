Rails.application.routes.draw do
  require 'sidekiq/web'

  devise_for :users, controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
  }

  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'users', skip: [:omniauth_callbacks]
    end
  end

  # map views
  get 'maps/fires' => 'maps#fires'
  get 'maps/windy' => 'maps#windy'

  # modis data
  #get 'modis_data/fires' => 'modis_data#fires'
  post 'modis_data/fires' => 'modis_data#fires'

  resources :reports

  mount Sidekiq::Web, at: '/sidekiq'
end

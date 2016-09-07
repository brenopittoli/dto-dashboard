Rails.application.routes.draw do
  resources :dashboards, :only => [:index, :show]

  namespace :api, defaults: {format: 'json'} do
    namespace :v1 do
      resources :datasets do
        resources :datapoints
      end
    end
  end

  get 'feedback', :to => 'feedback#index'

  get root 'dashboards#index'

  get '/index.html', :to => redirect('/')

  get '/copyright', :to => 'about#index'
end

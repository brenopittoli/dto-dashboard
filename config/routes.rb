Rails.application.routes.draw do
  ActiveAdmin.routes(self)

  resources :dashboards, :only => [:index, :show]

  get 'feedback', to: 'feedback#index'

  get root 'dashboards#index'
  get '/copyright', to: 'about#copyright'
end

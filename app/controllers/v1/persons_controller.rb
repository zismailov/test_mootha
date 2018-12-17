class V1::PersonsController < ApplicationController
  def acted
    person = Person::ActedService.new(params[:id]).execute
    render json: person
  end

  def show
    person = Person::ShowService.new(params[:id]).execute
    render json: person
  end
end
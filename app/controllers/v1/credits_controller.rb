class V1::CreditsController < ApplicationController
  def show
    credits = Credits::ShowService.new(params[:id]).execute
    render json: credits
  end
end
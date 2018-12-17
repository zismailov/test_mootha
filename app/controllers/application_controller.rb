class ApplicationController < ActionController::Base
  private
  def render_resource(resource)
    if resource.errors.empty?
      render json: resource
    else
      validation_error(resource)
    end
  end

  def validation_error(resource)
    render json: {
      errors: [
        resource.errors
      ]
    }, status: :bad_request
  end
end
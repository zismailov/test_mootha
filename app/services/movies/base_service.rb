module Movies
  class BaseService
    include HTTParty
    base_uri 'https://api.themoviedb.org'
    API_KEY = 'fcac6e485a2f9dedc24d13847610cfe4'

    def execute
      JSON.parse(query_response_body)
    end

    private
      def default_params
        { language: 'en-US', api_key: API_KEY }
      end
  end
end
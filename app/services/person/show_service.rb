module Person
  class ShowService < BaseService
    attr_reader :person_id

    def initialize(person_id)
      @person_id = person_id
    end

    private
      def query_response_body
        self.class.get("/3/person/#{person_id}", query: default_params).body
      end
  end
end
class FeedbackController < AuthenticatedController

  def index
    @title = "Feedback"
    @description = "Feedback description"

    render :index
  end

end

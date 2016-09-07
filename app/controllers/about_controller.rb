class AboutController < AuthenticatedController

  def index
    @title = "Copyright"
    @description = "Copyright"

    render :copyright
  end

end

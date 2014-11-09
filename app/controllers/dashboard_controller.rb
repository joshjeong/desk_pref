class DashboardController < ApplicationController
  before_filter :authenticate_user!

  def index
  end

  def show
    desk_type = params[:desk]
    desk = Desk.find_by('style=?', desk_type)
    respond_to do |format|
      format .json {render json: desk}
    end
  end


end

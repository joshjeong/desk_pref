class DashboardController < ApplicationController
  before_filter :authenticate_user!

  def index
    if current_user.admin
      redirect_to controller:'admin', action:'index'
    end
    if current_user.desk_type
      @desk = current_user.desk_type
    end
  end

  def show
    desk_type = params[:desk]
    desk = Desk.find_by('style=?', desk_type)
    respond_to do |format|
      format .json {render json: desk}
    end
  end

  def update
    @desk = params[:desk]
    current_user.desk_type = @desk
    current_user.save
    render :selected, layout: false
  end


end

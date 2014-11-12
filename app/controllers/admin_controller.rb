class AdminController < ApplicationController
  include AdminHelper
  def index
    users = User.all
    @desks = Desk.all
    @users_list = {}
    users.each do |user|
      @users_list[user.email] = user.admin
    end
    @users_list
  end

  def update
    email = params[:email]
    admin = params[:admin]
    @user = User.find_by('email = ?', email)
    @user.admin = admin
    @user.save
    render :updated, layout: false
  end

  def stats
    percentage = get_percentage
    respond_to do |format|
      format .json {render json: percentage}
    end
  end

  def hover
  end

end

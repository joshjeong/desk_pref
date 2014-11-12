class AdminController < ApplicationController
  def index
    @users = User.all
    @users_list = {}
    @users.each do |user|
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

end

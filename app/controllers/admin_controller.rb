class AdminController < ApplicationController
  def index
    users = User.all
    @users_list = {}
    users.each do |user|
      email = user.email.split('@').first
      @users_list[email] = user.admin
    end
    @users_list
  end
end

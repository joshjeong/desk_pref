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
    @desks = Desk.all
    desk_types = ["BASIC", "STANDING", "MEGA"]
    desk_types.each
    basic_count = User.where('desk_type=?', 'BASIC').length.to_f
    standing_count = User.where('desk_type=?', 'STANDING').length.to_f
    mega_count = User.where('desk_type=?', 'MEGA').length.to_f
    sum = basic_count + standing_count + mega_count
    basic = calc_perc(basic_count, sum)
    standing = calc_perc(standing_count, sum)
    mega = calc_perc(mega_count, sum)
    percentage = {basic: basic, standing: standing, mega: mega}
    respond_to do |format|
      format .json {render json: percentage}
    end
  end

end

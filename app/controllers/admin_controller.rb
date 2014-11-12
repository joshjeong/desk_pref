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
    desk = params[:desk]
    desk_price = Desk.find_by('style=?', desk).price
    all_users = User.all.length
    desk = desk.upcase!
    desk_users = User.where('desk_type = ?', desk).length
    count = count_desks(get_desk_types)
    calc = calc_perc(count[desk], count["sum"])
    percentage = calc.round(2).to_s+"%"
    data = {
      price: desk_price,
      allUsers: all_users,
      deskUsers: desk_users,
      count: count,
      percentage: percentage      
    }
    respond_to do |format|
      format .json {render json: data}
    end
  end

end

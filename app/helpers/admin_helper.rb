module AdminHelper

  def get_percentage
    desk_types = get_desk_types
    count = count_desks(desk_types)
    percentage = {}
    desk_types.each do |desk|
      percentage[desk] = calc_perc(count[desk], count["sum"])
    end
    percentage
  end

  def get_desk_types
    desks = Desk.all
    desk_types = []
    desks.each do |desk|
      desk_types << desk.style.upcase!
    end
    desk_types
  end

  def calc_perc(desk, sum)
    percentage = (desk/sum)*100
    return percentage
  end


  def count_desks(desk_styles)
    count = {}
    sum = 0
    desk_styles.each do |desk|
      numb_of_type = User.where('desk_type=?', "#{desk}").length.to_f
      count["#{desk}"] = numb_of_type
      sum += numb_of_type
      count["sum"]= sum
    end
    count
  end

end

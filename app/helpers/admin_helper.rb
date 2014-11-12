module AdminHelper

  def calc_perc(desk, sum)
    percentage = (desk/sum)*100
    return percentage
  end

end

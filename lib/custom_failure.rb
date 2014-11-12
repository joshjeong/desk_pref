class CustomFailure < Devise::FailureApp
  def redirect_url
    home_index_path
  end

  def respond
    if http_auth?
      http_auth
    else
      redirect
    end
  end
end
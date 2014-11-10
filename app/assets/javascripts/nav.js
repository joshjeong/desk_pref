$(document).ready(function(){
  var nController = new Nav.Controller(Nav.View);
  nController.bindListeners();
});

Nav.Controller = function(view){
  this.view = new view;
};

Nav.Controller.prototype = {
  bindListeners: function(){
    this.signUpListener();
    this.signInLinkListener();
  },
  signUpListener: function(){
    var self = this;
    $('#sign-up').on('click', function(e){
      e.preventDefault();
      self.signUp();
    })
  },
  signInLinkListener: function(){
    var self = this;
    $('#signin-link').on('click', function(e){
      e.preventDefault();
      self.signInLink();
    })
  },
  signUp: function(){
    this.view.showSignUp();
    this.view.hideSignIn();
  },
  signInLink: function(){
    this.view.hideSignUp();
    this.view.showSignIn();
  }
};

Nav.View = function(){};

Nav.View.prototype = {
  showSignUp: function(){
    $('.signup-container').css('visibility', 'visible');
  },
  hideSignIn: function(){
    $('.user-login').css('visibility', 'hidden');
  },
  hideSignUp: function(){
    $('.signup-container').css('visibility', 'hidden');
  },
  showSignIn: function(){
    $('.user-login').css('visibility', 'visible');
  }

}


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
  },
  signUpListener: function(){
    var self = this;
    $('#sign-up').on('click', function(e){
      e.preventDefault();
      self.signUp($(this));
    })
  },
  signUp: function(link){
    console.log('worked')
    // $.ajax({
    //   url: ,
    //   type: ,
    //   data:
    // }).done(function(response){

    // })
  }
};

Nav.View = function(){};

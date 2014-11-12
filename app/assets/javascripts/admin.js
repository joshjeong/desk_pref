$(document).ready(function(){
  var aController = new Admin.Controller(Admin.View);
  aController.bindListeners();
});

Admin.Controller = function(view){
  this.view = new view;
};

Admin.Controller.prototype = {
  bindListeners: function(){
    this.dataNavListener();
    this.usersNavListener();
  },
  dataNavListener: function(){
    var self = this;
    $('#data-nav').on('click', function(){
      self.dataNav();
    })
  },
  usersNavListener: function(){
    var self = this;
    $('#users-nav').on('click', function(){
      self.usersNav();
    })
  },
  dataNav: function(){
  },
  usersNav: function(){
  }
}

Admin.View = function(){}

Admin.View.prototype = {

}
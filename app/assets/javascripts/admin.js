$(document).ready(function(){
  var bController = new Bar.Controller(Bar.View)
  var aController = new Admin.Controller(Admin.View, bController);
  aController.bindListeners();
  bController.bindListeners();
});

Admin.Controller = function(view, bController){
  this.view = new view;
  this.bController = bController;
};

Admin.Controller.prototype = {
  bindListeners: function(){
    this.usersTabListener();
    this.toggleOnListener();
    this.toggleOffListener();
  },
  usersTabListener: function(){
    var self = this;
    $('#users-nav').on('click', function(){
      self.usersTab();
    })
  }, 
  toggleOnListener: function(){
    var self = this;
    $('.admin-setting-column').on('click', '.admin-false', function(){
      self.toggleOn($(this));
    })
  },
  toggleOffListener: function(){
    var self = this;
    $('.admin-setting-column').on('click', '.admin-true', function(){
      self.toggleOff($(this));
    })
  },
  dataTab: function(){
    var self = this;
    this.view.hideUsersTab();
    this.bController.showDataTab();
  },
  usersTab: function(){
    this.bController.hideDataTab();
    this.view.showUsersTab();
  },
  toggleOn: function(button){
    var email = button.closest('tr').find('.user-column').html().trim()
    console.log(email)
    this.view.toggleOnPic(button)
    $.ajax({
      url: "/admin/update",
      type: "PUT",
      data: {email: email, admin: true}
    }).done(function(response){

    })
  },
  toggleOff: function(button){
    var email = button.closest('tr').find('.user-column').html().trim()
    this.view.toggleOffPic(button);
    $.ajax({
      url: "/admin/update",
      type: "PUT",
      data: {email: email, admin: false}
    }).done(function(response){

    })
  }
}

Admin.View = function(){}

Admin.View.prototype = {
  toggleOnPic: function(button){
    button.css('background-image', "url('/assets/toggle-on.png')")
    button.removeClass('admin-false')
    button.addClass('admin-true')
  },
  toggleOffPic: function(button){
    button.css('background-image', "url('/assets/toggle-off.png')")
    button.removeClass('admin-true')
    button.addClass('admin-false')
  },
  hideUsersTab: function(){
    $('.users-container').css('visibility', 'hidden')
  },
  showUsersTab: function(){
    $('.users-container').css('visibility', 'visible')
  }
}
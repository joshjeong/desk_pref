$(document).ready(function(){
  var aController = new Admin.Controller(Admin.View);
  aController.bindListeners();
});

Admin.Controller = function(view){
  this.view = new view;
};

Admin.Controller.prototype = {
  bindListeners: function(){
    this.dataTabListener();
    this.usersTabListener();
    this.toggleOnListener();
    this.toggleOffListener();
  },
  dataTabListener: function(){
    var self = this;
    $('#data-nav').on('click', function(){
      self.dataTab();
    })
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
    this.view.showDataTab();
    $.ajax({
      url: '/admin/stats',
      type: 'GET'
    }).done(function(response){
      basic = response.basic
      standing = response.standing
      mega = response.mega
      self.view.changeGraph("basic",basic)
      self.view.changeGraph("standing",standing)
      self.view.changeGraph("mega",mega)
    })
  },
  usersTab: function(){
    this.view.hideDataTab();
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
  hideDataTab: function(){
    $('.data-container').css('visibility', 'hidden')
  },
  showDataTab: function(){
    $('.data-container').css('visibility', 'visible')
  },
  hideUsersTab: function(){
    $('.users-container').css('visibility', 'hidden')
  },
  showUsersTab: function(){
    $('.users-container').css('visibility', 'visible')
  },
  changeGraph: function(desk, value){
    $('#bar-'+desk).css('height', value+'%')
  }
}
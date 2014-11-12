$(document).ready(function(){
});

Bar.Controller = function(view){
  this.view = new view;
}

Bar.Controller.prototype = {
  bindListeners: function(){
    this.dataTabListener();
    this.hoverBarListener();
  },
  hoverBarListener: function(){
    var self = this;
    $('.bar-container').on('mouseenter', '.bars', function(){
      self.hoverOn($(this));
    }),
    $('.bar-container').on('mouseleave', '.bars', function(){
      self.hoverOut($(this));
    })
  },
  dataTabListener: function(){
    var self = this;
    $('#data-nav').on('click', function(){
      self.dataTab();
    })
  },
  hoverOn: function(bar){
    this.view.showShadow(bar);
  },
  hoverOut: function(bar){
    this.view.hideShadow(bar)
  },
  dataTab: function(){
    var self = this;
    this.view.showData();
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
  hideDataTab: function(){
    this.view.hideData();
  },
  showDataTab: function(){
    this.view.showData();
  }
}


Bar.View = function(){}

Bar.View.prototype = {
  hideData: function(){
    $('.data-container').css('visibility', 'hidden')
  },
  showData: function(){
    $('.data-container').css('visibility', 'visible')
  },
  changeGraph: function(desk, value){
    $('#bar-'+desk).css('height', value+'%')
  },
  showShadow: function(bar){
    bar.addClass('shadow')
  },
  hideShadow: function(bar){
    bar.removeClass('shadow')
  }


}
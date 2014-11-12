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
    $('.bar-container').on('mouseover', '.bars', function(){
      self.hoverBar($(this));
    })
  },
  dataTabListener: function(){
    var self = this;
    $('#data-nav').on('click', function(){
      self.dataTab();
    })
  },
  hoverBar: function(bar){
    console.log('barz')
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
  }

}
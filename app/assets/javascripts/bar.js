$(document).ready(function(){
  var bController = new Bar.Controller(Bar.View);
  bController.bindListeners();
});

Bar.Controller = function(view){
  this.view = new view;
}

Bar.Controller.prototype = {
  bindListeners: function(){
    this.hoverBarListener();
  },
  hoverBarListener: function(){
    var self = this;
    $('.bar-container').on('mouseover', '.bars', function(){
      self.hoverBar($(this));
    })
  },
  hoverBar: function(bar){
    console.log('barz')
  }
}



Bar.View = function(){}

Bar.View.prototype = {


}
$(document).ready(function(){
  var cDesk = new Desk.Controller(Desk.View);
  cDesk.bindListeners();
});

Desk.Controller = function(view){
  this.view = new view;
};

Desk.Controller.prototype = {

  bindListeners: function(){
    this.clickDeskListener();
    this.hoverDeskListener();
  },
  clickDeskListener: function(){
    var self = this;
    $('.desk-pic').on('click', function(e){
      self.clickDesk($(this))
    })
  },

  clickDesk: function(pic){
    var deskType = pic.attr('id')
    this.view.dim(pic)
    $.ajax({
      url: 'dashboard/show',
      data: {desk: deskType}
    }).done(function(response){
      var desk = {
          style: response.style.toUpperCase(),
          pic: response.style+".jpg",
          desc_arr: response.description.split(',')
      }
      var template = "<img src= '/assets/{{pic}}'/><div id='desk-info'><h1>{{style}}</h1><ul>{{#desc_arr}}"+
                      "<li>{{.}}</li>{{/desc_arr}}</ul></div>"
      var html = Mustache.to_html(template, desk)
      $('body').append(html)
    })
  },
  hoverDeskListener: function(){
    var self = this;

    $('.desk-pic').on('mouseenter', function(e){
      self.view.showOverlay($(this))
    });
    $('.desk-pic').on('mouseleave', function(e){
      self.view.hideOverlay($(this))
    })
  }

};

Desk.View = function(){};

Desk.View.prototype = {
  showOverlay: function(container){
    container.find('.overlay').fadeIn(200)
  },
  hideOverlay: function(container){
    container.find('.overlay').fadeOut(200)
  },
  dim: function(pic){
    $('.dimOverlay').css('visibility', 'visible')
  }
};
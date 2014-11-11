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
    this.escKeyListener();
  },
  clickDeskListener: function(){
    var self = this;
    $('.desk-pic').on('click', function(e){
      self.clickDesk($(this))
    })
  },

  clickDesk: function(container){
    
    var deskType = container.attr('id'),
        self = this,
        pic = container.css('background-image').replace('http://localhost:3000','')
    $('.description-text').html('')
    this.clickOutsideListener();
    this.view.showModal();
    $.ajax({
      url: 'dashboard/show',
      data: {desk: deskType}
    }).done(function(response){
      var desk = {
          style: response.style.toUpperCase(),
          desc_arr: response.description.split(',')
      }
      var template = "<h1>{{style}}</h1><ul>{{#desc_arr}}"+
                      "<li>- {{.}}</li>{{/desc_arr}}</ul>"
      var html = Mustache.to_html(template, desk)
      self.view.loadImage(pic);
      $('.description-text').html(html)
      self.selectDeskListener();
      self.cancelDeskListener();
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
  },
  clickOutsideListener: function(){
    var self = this;
    $('body').on('click', function(e){
      if(e.target.className=="dimOverlay"){
        self.view.closeModal();
      }
    })
  },
  escKeyListener: function(){
    var self = this;
    $('body').keyup(function(e){
      if(e.keyCode==27){
        self.view.closeModal();
      }
    })
  },
  selectDeskListener: function(){
    var self = this;
    $('#select-btn').on('click', function(e){
      e.preventDefault();
      self.updateUserPref($(this));
      self.view.closeModal();
    })
  },
  cancelDeskListener: function(){
    var self = this;
    $('#cancel-btn').on('click', function(e){
      e.preventDefault();
      self.view.closeModal();
    })
  },
  updateUserPref: function(button){
    var deskType = button.parent().find('h1').html(),
        self = this
    $.ajax({
      url: 'dashboard/update',
      type: 'PUT',
      data: {desk: deskType}
    }).done(function(response){
      var new_pref = this.data.split('=')[1]
      self.view.changePrefTitle(response);

    })
  }
}

Desk.View = function(){};

Desk.View.prototype = {
  showOverlay: function(container){
    container.find('.overlay').fadeIn(200)
  },
  hideOverlay: function(container){
    container.find('.overlay').fadeOut(200)
  },
  closeModal: function(){
    $('.description-container').css('visibility', 'hidden')
    $('.modal-content').css('visibility', 'hidden')
    $('.dimOverlay').css('visibility', 'hidden')
    $('.modal-pic').css('background-image', 'none')
  },
  showModal: function(){
    $('.description-container').css('visibility', 'visible')
    $('.modal-content').css('visibility', 'visible')
    $('.dimOverlay').css('visibility', 'visible')
  },
  changePrefTitle: function(pref){
    // $('#desk-pref').html(pref)
    $('#choose-title').html(pref)
  },
  loadImage: function(pic){
    $('.modal-pic').css('background-image', pic)
  }
};
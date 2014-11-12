Chart.Controller = function(view){
  this.view = new view;
}

Chart.Controller.prototype = {
  bindListeners: function(){
    this.dataTabListener();
    this.hoverChartListener();
  },
  hoverChartListener: function(){
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
    this.view.showDetails();
    var desk = bar.attr('id').split('-')[1],
        self = this;
    $.ajax({
      url: '/admin/hover',
      type: 'GET',
      data: {desk: desk}
    }).done(function(response){
        var details = { 
              price: response.price,
              allUsers: response.allUsers,
              deskUsers: response.deskUsers,
              percentage: response.percentage
        }

        self.view.updateDetails(details)

    })
  },
  hoverOut: function(bar){
    this.view.hideShadow(bar);
    this.view.hideDetails();
  },
  dataTab: function(){
    var self = this;
    this.view.showData();
    $.ajax({
      url: '/admin/stats',
      type: 'GET'
    }).done(function(response){
      basic = response.BASIC
      standing = response.STANDING
      mega = response.MEGA
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


Chart.View = function(){}

Chart.View.prototype = {
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
  },
  updateDetails: function(data){
    $('#price').html('$'+ data.price)
    $('#all-users').html(data.allUsers)
    $('#percentage').html(data.percentage + ' ('+data.deskUsers + ' Employees)')
    $('#total-cost').html('$'+ data.price*data.allUsers)
  },
  showDetails: function(){
    $('.bar-details').css('visibility', 'visible');
  },
  hideDetails: function(){
    $('.bar-details').css('visibility', 'hidden');
  }
}
function set_page_size() {
  main_container = $('#main-container');
  navbar = $('#sideNav');
  if(window.matchMedia("(min-width: 992px)").matches){
    main_container.width($(window).width() - navbar.outerWidth());
    main_container.css('margin-right','unset');
  }
  else {
    main_container.width("auto");
    main_container.css('margin-left','auto');
  }
}

function change_anchor_to_id() {
  $("[href$='about-anchor']").attr("href", "#about");
  $("[href$='education-anchor']").attr("href", "#education");
  $("[href$='skills-anchor']").attr("href", "#skills");
  $("[href$='lastworks-anchor']").attr("href", "#lastworks");
}

function change_id_to_anchor() {
  $("[href$='about']").attr("href", "#about-anchor");
  $("[href$='education']").attr("href", "#education-anchor");
  $("[href$='skills']").attr("href", "#skills-anchor");
  $("[href$='lastworks']").attr("href", "#lastworks-anchor");
}

function js_scroller(event) {
  if (location.pathname.replace(/^\//, '') == event.pathname.replace(/^\//, '') && location.hostname == event.hostname) {
    var target = $(event.hash);
    target = target.length ? target : $('[name=' + event.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({scrollTop: (target.offset().top)}, 1000, "easeInOutExpo");
      return false;
    }
  }
}

function set_fullpage() {
  fullpage = $('#fullpage');
  if ( $('.fp-enabled').length )
    $.fn.fullpage.destroy('all');
  
  if(window.matchMedia("(min-width: 992px)").matches) {
    change_id_to_anchor();
    body.scrollspy({target: '#sideNav'});
    fullpage.fullpage({
      afterLoad: function(anchorLink, index) {history.pushState(null, null, "index.html");}, 
      anchors: ['about-anchor', 'skills-anchor', 'education-anchor', 'lastworks-anchor'], 
      menu: '#sideNav-ul'}
    );
  }
  else {
    change_anchor_to_id();
    body.scrollspy({target: '#sideNav'});
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {js_scroller(this);});
  }
}

$(document).ready(function(){
  body = $('body');
  tooltip = $('[data-toggle="tooltip"]'); 

  tooltip.tooltip(); 
  
  set_fullpage();
  set_page_size();
});

window.onresize = function(event) {
  set_fullpage();
  set_page_size();
};
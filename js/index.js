var moveAbout, logoMove, moveSoc;

$(function() {
  
  // get the three nav buttons
  var aboutBtn = $(".about-button");
  var portBtn = $(".port-button");
  var contactBtn = $(".contact-button");
  
  // get the three nav buttons
  var aboutLink = $(".about-link");
  var portLink = $(".port-link");
  var contactLink = $(".contact-link");
  var soc = $("#soc-btn0");
  
  // initialize about and logo animations
  logoMove = true;
  moveAbout = true;
	moveSoc = true;
  $(".about-section").css("opacity", "0");
  $(".resume").css("opacity", "0");
	
  for (var i = 0; i < 4; i++) {
	var id = "#soc-btn" + i;
	$(id).css("opacity", "0");
  }


  var animateSoc = function(){
    if (moveSoc){
      
      for (var i = 0; i < 4; i++) {
        var id = "#soc-btn" + i;
        var delay = 50 + (i * 150)
        $(id).delay(delay).animate({top: "-=5", opacity: 1}, 500);;
      }      

      moveSoc = false;
    }
}

	

  /*
* Checks if the given element is in view
*/
  var isScrolledIntoView = function(elem) {
    // get the top of the screen
    var docViewTop = $(window).scrollTop();

    // get the bottom of the screen
    var docViewBottom = docViewTop + $(window).height();

    // get top and bottom of elem (offset returns object w/ top and left)
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    /* 
  * checks if the bottom of the element is below top of viewport
  * checks if top of element is above bottom of viewport
  * checks if top of element is below top of viewport
  * To do: can we remove that first line?
  */
    return (
      elemBottom >= docViewTop &&
      elemTop <= docViewBottom &&
      elemTop >= docViewTop
    );
  };

  
  var checkScroll = function(){
	// checks which section of the page is in view
    if (isScrolledIntoView(soc))
      animateSoc();    

    if  (isScrolledIntoView(portLink)){
      setActive(portBtn);
      removeActive(aboutBtn, contactBtn);
    }
	
	if (isScrolledIntoView(contactLink)) {
      setActive(contactBtn);
      removeActive(portBtn, aboutBtn);
      
    } 
	
	if (isScrolledIntoView(aboutLink)) {
		if (!(isScrolledIntoView(contactLink))){
			setActive(aboutBtn);
			removeActive(portBtn, contactBtn);
		}
      animateAbout();
    }
  }
  
  /*
* Every time window is scrolled, update navbar
*/
  $(window).scroll(function() {
    
    // checks if navbar has hit top of page
    if (checkNavbar())
      navbarFixedOn();
    else
      navbarFixedOff();
    
    checkScroll(); 
	
	 

  });

  /*
  * Checks and returns true if navbar is at top of screen
  */
  var checkNavbar = function(){
    var viewTop = $(window).scrollTop();
    var navTop = $(".navbar").offset().top;
    var greetingBottom = $(".greeting").offset().top + $(".greeting").height();
    
    if ((viewTop >= navTop) && (viewTop >= greetingBottom)){
      return true;
    }
    else return false;
    
  }
  
  /*
  * Fixes navbar to top of page
  */
  var navbarFixedOn = function(){
    var navbar = $(".navbar");
    if (!(navbar.hasClass("navbar-fixed-top")))
      navbar.addClass("navbar-fixed-top"); 
    $(".ghost-nav").removeClass("hidden");
    
    // make logo fade in
    if (logoMove){
      $("#navbar-name").animate({left: "+=10", opacity: 1}, 300);
      logoMove = false;
    }
  }
  
  /*
  * Unsticks navbar from top of page
  */
  var navbarFixedOff = function(){
    $(".navbar").removeClass("navbar-fixed-top");
    $(".ghost-nav").addClass("hidden");
    
    // make logo fade out   
    if (!logoMove){
      $("#navbar-name").animate({left: "-=10", opacity: 0}, 300);
      logoMove = true;
    } 
    
  }
  
  
  /*
* Sets active button on navbar
*/
  var setActive = function(activeBtn) {
    if (!activeBtn.hasClass("active")) activeBtn.addClass("active");
  };

  /*
* Removes active status from buttons a and b on navbar
*/
  var removeActive = function(a, b) {
    a.removeClass("active");
    b.removeClass("active");
  };

  /*
* Set listeners for clicking on nav buttons
*/
  $(aboutBtn).click(function() {
      setActive(aboutBtn);
      removeActive(portBtn, contactBtn);
  });
  $(portBtn).click(function() {
      setActive(portBtn);
      removeActive(aboutBtn, contactBtn);
  });
    $(contactBtn).click(function() {
      setActive(contactBtn);
      removeActive(portBtn, aboutBtn);
  });

  /*
* Handles behavior once a nav button is clicked
*/
  var handleClick = function(e) {};
    
  var animateAbout = function(){
    if (moveAbout){
      
      $(".about-section").delay(500).animate({top: "-=10", opacity: 1}, 1000);
	  $(".resume").delay(1100).animate({top: "-=10", opacity: 1}, 1000);
      moveAbout = false;
    }
  }
  
  // checks navbar
  if (checkNavbar())
    navbarFixedOn();
  else
    navbarFixedOff();
  
  // checks where we are on page
  checkScroll();
  
  /*
  *	Close navbar dropdown when link is clicked
  */
	$(".navbar-right li").click(function(){
		
		$(".navbar-collapse").removeClass("in");
		
	});
  
});



  /*-------------------------------------------------------------------------------
    PRE LOADER
  -------------------------------------------------------------------------------*/

  $(window).load(function(){
    // Wait a bit longer to ensure all components are rendered
    setTimeout(function() {
      $('.preloader').fadeOut(500); // Reduced duration for faster transition
    }, 200); // Small delay to ensure React components are rendered
  });

// Here's Knockout data model

$(document).ready(function() {
	
var viewModel =  {
    bandwidth : ko.observable("2500"),
    region : ko.observable("SC"), 
	optionValues : ["Mid State", "Bay Area", "Santa Cruz"],
    selectedOptionValue : ko.observable("SC") 
};
 
ko.applyBindings(viewModel); // This makes Knockout get to work
// end of document ready function

// subscribing to region variable
viewModel.selectedOptionValue.subscribe(function(newValue) {
	  //alert("The region is: " + newValue);
	  var region = "SC"; 	
	  if (newValue == "Bay Area") {region = "BA";}
	  if (newValue == "Mid State") {region = "MID";}
	  if (newValue == "Santa Cruz") {region = "SC";}
	  show(region);  
	 
  });

// subscribing to bandwidth variable
viewModel.bandwidth.subscribe(function(newValue) {
	  alert("The bandwidth is: " + newValue);
  });  

  //     this submit button would not work unless loaded after page
       $('#submitbutton').click(function(){
        console.log("clicked me");
        runPyScript();    
   
           });
	   
//	   after page has loaded, query att sitw for updated speeds
  updateDeviceSpeeds() ; 
  
}); 
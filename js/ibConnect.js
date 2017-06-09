// ibConnect js functions 
// Lisa Guadagna , Udacity student 
// License: MIT (http://www.opensource.org/licenses/mit-license.php)
      
      var map;
      var flaskServerName = "cowbell.employees.org";
      
     var locations = [ 
	
	 {id: '41d853773e740b89da629dbca6570c2a', name: '101 Cooper St', 
     location: {lat: 36.9752703, lng: -122.0283402, region: "SC" }, bpsu: 10200, bpsd: 3000},
	 {id: '3be9579d6089fe95dbffb0186f752be4', name: 'Valencia Apartments, San Louis Obispo', 
     location: {lat: 35.29287, lng:-120.6762382, region: "MID" }, bpsu: 44000, bpsd: 40000},
	 {id: 'a58829f26dc86cc96c4539240d8676ce', name: 'Swanton Berry Farm', 
     location: {lat:  37.0303727, lng: -122.2205668, region: "SC" }, bpsu: 773, bpsd: 45000},
	 {id: 'e065dbf7a12c43f7e0d910ea31992826', name: 'RoadHouse', 
     location: {lat: 37.0109223  , lng: -122.1938546, region: "SC"   }, bpsu: 45000, bpsd: 45000 },
  
    {id: 'a0f2093dd325f1e43a175839d02d049f', name: 'Lassens', 
     location: {lat: 35.2948578  , lng: -120.6698484, region: "MID"   }, bpsu: 45000, bpsd: 45000 },
    {id: 'd188b6e5617cb5b0cfdb9b26217b4257', name: 'scoutCoffeeHouse', 
     location: {lat: 35.2945799846  , lng: -120.669866502, region: "MID"   }, bpsu: 45000, bpsd: 45000 },
    {id: '1bce8e5ed43a5daaf85bc4516f8a575d', name: 'San Jose Home', 
     location: {lat: 37.3941  , lng: -121.835, region: "BA"   }, bpsu: 45000, bpsd: 45000 }
        
  
   ];	
	 
      // Create a new blank array for all the listing markers.
      var markers = [];
      
     // a nice explaination of asynch calls and responses 
     //https://stackoverflow.com/questions/16076009/confused-on-jquery-ajax-done-function
     function runPyScript(){
         var m2x_url = "HTTP://" + flaskServerName + ":5000/getM2XNames"; 
         console.log('sending device request to getM2XNames' +  m2x_url);
         $.ajax({
             url: m2x_url,
             dataType: "jsonp",
             crossDomain: true,
             async: true ,
             timeout: 10000,
//             error is called upon timeout.
             error: function() {
                  console.log ("10 sec ajax timeout! try again later..");
                  $('#error').css({'visibility': 'visible'});
                  alert ("request to get device id's can not be completed, try again later"); 
             }
          }).done(function(result){
           console.log('Sample of data: ', result );
                  $('#error').css({'visibility': 'hidden'});
                 console.log( result);
                 // should copy entire array in javascript
                 locations = []; 
                 locations = result.concat();
//                 clear marker array 
                 deleteMarkers(); 
                 initMap();
                 updateDeviceSpeeds(); 

             } );
     }
     
//     this submit button goes with the script above
       $('#submitbutton').click(function(){
        console.log("clicked submit button");
        runPyScript();
           });
       

// we need an att call which returns jsonp for integration into web browser*       
     function updateBPS(deviceID){
//      this is valid curl request to URL, does not return jsonp 
//      curl -i http://api-m2x.att.com/v2/devices/de9eb3c3f377789e4086cd4034946b39/streams -H "X-M2X-KEY: 3ca45efac99756802ab65c4250e27cb2"
//       -H "X-M2X-KEY: 3ca45efac99756802ab65c4250e27cb2"
         //var m2x_url = 'http://api-m2x.att.com/v2/devices/' + deviceID + '/streams'; 
         
          var bps_url = "HTTP://" + flaskServerName + ":5000/getStream/" + deviceID;
          $.ajax({
 
             crossDomain: true, 
             url: bps_url,
             dataType: "json",
             jsonpCallback: 'postResults', 
             async: true ,
             timeout: 20000,
//             error is called upon timeout.
             error: function(ts) {
                  console.log("error " + ts.responseText);
                  $('#error').css({'visibility': 'visible'});
                  updateLocationData(deviceID, '{"bpsu": 1 , "bpsd": 1 }' ); 
                         },
          }).done(function(result){
             $('#error').css({'visibility': 'hidden'});
           // turn result into a JSON 'object notation object'
           updateLocationData(deviceID, result); 
           
             } );
     }
     
      function updateDeviceSpeeds() {
            for (var i = 0; i < locations.length; i++) {
               updateBPS(locations[i].id);    
            }
      }

      function updateLocationData(deviceID, result) {
            for (var i = 0; i < locations.length; i++) {
               if (locations[i].id == deviceID ) {
                  var speeds = JSON.parse(result);
                  locations[i].bpsu = speeds.bpsu;
                  locations[i].bpsd = speeds.bpsd;
                  updateMarker(deviceID, speeds.bpsu, speeds.bpsd) ; 
               }
            }
      }
     
     function updateMarker(markerKey, bpsu, bpsd ){
      for (var i = 0; i < markers.length; i++) {
      if (markers[i].key == markerKey) { 
          var marker = markers[i]; 
          if (bpsu > 40000 || bpsd > 40000 ) {
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
          } else
          if (bpsu > 10000 || bpsd > 10000 ) {
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/orange-dot.png');
          } else
          if (bpsu < 10000 || bpsd < 10000 ) {
          marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
          }
          if (bpsu < 100 || bpsd < 100 ) {
          marker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
          }
          }
      }
     } 
      
      function findLocationSpeed(deviceID) {
            for (var i = 0; i < locations.length; i++) {
               if (locations[i].id == deviceID ) {
                  return {'bpsu': locations[i].bpsu, 'bpsd': locations[i].bpsd}; 
               } 
            } return {'err' : 'err'}; 
      } 
      
      
      function initMap() {
        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 36.974117 , lng: -122.030792 },
          zoom: 13
        }); 
      
        var largeInfowindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();
      
        // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].location;
          var title = locations[i].name;
          var key = locations[i].id; 
          // Create a marker per location, and put into markers array. 
          var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            key: key, 
            //animation: google.maps.Animation.DROP,
            id: i
          });
//          default color marker 
          marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
          // Push the marker to our array of markers.
          markers.push(marker);
          // Create an onclick event to open an infowindow at each marker.
          marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });
          bounds.extend(markers[i].position);
        }
         map.fitBounds(bounds);
         show("All");
      } 
      
         
        // This function populates the infowindow when the marker is clicked. We'll only allow
      // one infowindow which will open at the marker that is clicked, and populate based
      // on that markers position.
      function populateInfoWindow(marker, infowindow) {
        var markerText = ""; 
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          var result = (findLocationSpeed(marker.key));
          markerText = marker.title + " <br> Up: " + result.bpsu + " <br> Down: " + result.bpsd; 
          infowindow.setContent('<div>' + markerText + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null; 
          });
          bounceMark(marker); 
        }
        }
        
        function bounceMark(M) {
            M.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function()
                       { M.setAnimation(null); }, 700 );     
      }
            
        
      function bounceMarker(selectedLocation) {
//        find marker
        var foundMarkerIndex;
        var foundMarker; 

          for (var i = 0; i < markers.length; i++) {
            if (markers[i].key == selectedLocation.id ) {
                foundMarkerIndex = i;
                foundMarker = markers[i]; 
// bounce it
          } }
        foundMarker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function()
                       { foundMarker.setAnimation(null); }, 700 );   
      } 

      // This function will loop through the markers array and display them all.
      function show(newRegion) {
        var bounds = new google.maps.LatLngBounds();
        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers.length; i++) {
          if ( newRegion == "All" ) {
          markers[i].setMap(map);
          bounds.extend(markers[i].position);  
          }   
          else   {
          if (locations[i].location.region == newRegion ) {
          markers[i].setMap(map);
          // add visible items
          bounds.extend(markers[i].position);       
          } else {
            markers[i].setMap(null);
            /*remove visible Item*/
          }
          }
        }
        map.fitBounds(bounds);
      }
      
      // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      } 

     // Removes the markers from the map, but keeps them in the array.
      function clearMarkers() {
        setMapOnAll(null);
      }

      // Shows any markers currently in the array.
      function showMarkers() {
        setMapOnAll(map);
      }

      // Deletes all markers in the array by removing references to them.
      function deleteMarkers() {
        clearMarkers();
        markers = [];
      }

      // This function will loop through the listings and hide them all.
      function hideMarkers() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
      }
      




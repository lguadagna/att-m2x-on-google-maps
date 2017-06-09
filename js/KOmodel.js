// Knockout data model
$(document).ready(function() {


    function viewModel() {

        var self = this;
        self.locations = ko.observableArray(locations);
        var visible_locations = locations.slice(); // assigning array values
        var checked_locations = [];
        var visible_selected = locations.slice();
        self.bandwidth = ko.observable("2500");
        self.region = "All";
        //	sets region variable and calls update to map 
        self.showRegion = function() {
            if (this.selectedOptionValue() == "Bay Area") {
                self.region = "BA";
            }
            if (this.selectedOptionValue() == "Mid State") {
                self.region = "MID";
            }
            if (this.selectedOptionValue() == "Santa Cruz") {
                self.region = "SC";
            }
            if (this.selectedOptionValue() == "All") {
                self.region = "All";
            }
            show(this.region);
            self.updateVisible(this.region);
            updateVisibleSelected(self.selectedLocations);
        };
        this.save = function() {
            alert('saved!');
        };
        this.optionValues = ["Mid State", "Bay Area", "Santa Cruz", "All"];
        this.selectedOptionValue = ko.observable("All");
        this.selectedName = ko.observable("1010 Last Chance Rd");
        this.visibleLocations = ko.observableArray(visible_locations);
        this.selectedLocations = ko.observableArray(checked_locations);

        //		subscribe to check box has changed
        this.selectedLocations.subscribe(function(checkedLocations) {
            //newValue contains array of checked values. All unchecked by default of array init above
            updateVisibleSelected();
        });

        this.visibleSelectedLocations = ko.observableArray(visible_selected);

        self.emptyAllVisibleItems = function() {
            self.visibleLocations.removeAll();
        };

        self.updateVisible = function(region) {
            self.emptyAllVisibleItems();
            //console.log(locations);
            for (var i = 0; i < locations.length; i++) {
                if (locations[i].location.region == region || region == "All") {
                    self.addVisibleItem(locations[i]);
                }
            }
        };
        updateChecked = function(location) {
            if (checked_locations.indexOf(location) == -1) {
                //			find marker with marker.key = location.id and animate it upon check
                //			call utility in ipConnect.js
                bounceMarker(location);

            }
            return true; // so that other actions on checkbox will be taken
        };
        updateVisibleSelected = function() {
            // look in the visible array only, if element there is in 'selectedArray' then put in visibleSelected 
            var checkedLocations = checked_locations;
            self.visibleSelectedLocations.removeAll();

            for (var i = 0; i < checkedLocations.length; i++) {
                for (var j = 0; j < visible_locations.length; j++) {
                    if (checkedLocations[i].name == visible_locations[j].name) {
                        self.visibleSelectedLocations.push(visible_locations[j]);
                    }
                }
            }
            return true; // so that other action on checkbox will be taken
        };

        self.removeVisibleItem = function(i) {
            self.visibleLocations.slice(i, 1);
        };
        self.addVisibleItem = function(location) {
            this.visibleLocations.push(location);

        };

    };

    ko.applyBindings(new viewModel()); // This makes Knockout get to work

    //	   after page has loaded, query att site for updated speeds

    updateDeviceSpeeds();

    // delay for 10 seconds and then check if map has a value returned from google
    // if not display error message 
    delay(function() {
        if (map) {
            x = 1;
            //console.log("map has a value");
        } else
            alert("can not get a value from google for map, check network connections");
    }, 5000);




});
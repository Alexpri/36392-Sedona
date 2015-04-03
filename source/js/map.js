function initialize() {
 var latlng = new google.maps.LatLng(34.8573, -111.795);
 var settings = {
 zoom: 15,
 center: latlng,
 mapTypeControl: true,
 mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
 navigationControl: true,
 navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
 mapTypeId: google.maps.MapTypeId.ROADMAP
 };
 var map = new google.maps.Map(document.getElementById("map_canvas"), settings);
};

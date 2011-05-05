var getKeys = function(obj){
    var keys = [];
    for (var key in obj) {
	if (obj.hasOwnProperty(key)) {
	    keys.push(key);
	}
    }
    return keys;
}


var senchaWidgets = [ 'Application', 'Panel', 'Tab' ];

for( var x in senchaWidgets ) {
    var name = senchaWidgets[x];
    angular.widget( 'Sencha:' + name, processWidget );
}

function processWidget( ce ) {
    var possibleAttributes = getKeys( $.getAttributes( $(ce[0]) ) );
    var options = {};
    var widget = null;
    $.each( possibleAttributes, function( index, key ) {
	    if( key != 'class' ) {
		options[key] = ce.attr( key );
	    }
	    else {
		// get the widget from the class
		var classes = ce.attr( key ).split( ' ' );
		var re = /^sencha-(.+)$/;
		$.each( classes, function( index, key ) {
			var results;
			if( results = re.exec( key ) ) {
			    widget = results[1];
			    widget = widget[0].toUpperCase() + widget.substr(1);
			}
		    } );
	    }
	});
    if( widget ) {
	new Ext[ widget ]( options );
    }
}


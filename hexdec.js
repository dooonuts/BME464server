exports.dec = function(hex,callback){
	var i;
	var[16] s;
	for(i=0;i<16;i++){
		var y = i*4;
		var z = y+3;
		s[i] = parseInt(hex[y:z],16);
	}
	callback(null, s);
}

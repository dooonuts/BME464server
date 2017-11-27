exports.dec = function(hex,callback){
	var i;
	var str = "";
	console.log(hex);
	for (i=0; i+3<hex.length; i = i+4){
		console.log(hex.substring(i,i+4));
		str = str + parseInt(hex.substring(i,i+4),16) + " ";
	}
	callback(null, str);
}

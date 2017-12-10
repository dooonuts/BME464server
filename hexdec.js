exports.dec = function(hex,callback){
	var i;
	var j=0;
	var str = "";
	var arr;
	console.log(hex);
	for (i=0; i+3<hex.length; i = i+4){
		console.log(hex.substring(i,i+4));
		str = str + parseInt(hex.substring(i,i+4),16) + " ";
		arr[j] = parseInt(hex.substring(i,i+4),16);
		j=j+1;
	}
	console.log("Printing string: " + str);
	console.log("Printing array: " + array);
	callback(null, str);
}

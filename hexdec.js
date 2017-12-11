exports.dec = function(hex,callback){
	var i;
	var j=0;
	var str = "";
	var arr = [];
	console.log(hex);
	for (i=0; i+3<hex.length; i = i+4){
		console.log(hex.substring(i,i+4));
		str = str + parseInt(hex.substring(i,i+4),16) + " ";
		if (i%4==0){
			arr[i/4] = parseInt(hex.substring(i,i+4),16);
		}
		j=j+1;
	}
	callback(null, str, arr);
}

exports.decpoints = function(hex,callback){
	var i;
	var j=0;
	var str = "";
	var arr = [];
	console.log(hex);
	for (i=0; i+3<hex.length; i = i+4){
		console.log(hex.substring(i,i+4));
		str = str + parseInt(hex.substring(i,i+4),16) + " ";
		if (i%4==0){
			arr.push({
				x: i/2,
				y: parseInt(hex.substring(i,i+4),16)
			});
		}
		j=j+1;
	}
	callback(null, arr);
}

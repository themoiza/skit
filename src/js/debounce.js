window.Debounce = (function(fn, ms, id){

	if(typeof(debounceInstance) === 'undefined'){
		window.debounceInstance = {};
	}

	return function(fn, ms, id){

		clearTimeout(debounceInstance[id]);
		debounceInstance[id] = setTimeout(fn, ms);
	};
}());

/* USAGE

Debounce(() => {

}, 1000, id);
*/
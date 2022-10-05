window.Dualrange = {
	unsetDisabled: (id) => {

		if(document.getElementById(id)){

			var el = document.getElementById(id);
			el.parentElement.classList.remove('disabled');

			var ranges = el.querySelectorAll('input[type=range]');

			ranges.forEach((range) => {
				range.removeAttribute('disabled');
			});
		}
	},
	setDisabled: (id) => {

		if(document.getElementById(id)){

			var el = document.getElementById(id);
			el.parentElement.classList.add('disabled');

			var ranges = el.querySelectorAll('input[type=range]');

			ranges.forEach((range) => {
				range.setAttribute('disabled', 'disabled');
			});
		}
	},
	toggleDisabled: (id) => {

		if(document.getElementById(id)){

			var el = document.getElementById(id);
			if(el.parentElement.classList.contains('disabled')){
				Dualrange.unsetDisabled(id);
			}else{
				Dualrange.setDisabled(id);
			}
		}
	},
	getValue: (id) => {

		var min = null;
		var max = null;

		if(document.getElementById(id)){

			var el = document.getElementById(id);
			var ranges = el.querySelectorAll('input[type=range]');

			var tempMin = Number(ranges[0].value);
			var tempMax = Number(ranges[1].value);

			if(tempMin == tempMax){

				min = tempMin;
				max = tempMax;

				return [min, max];
			}

			if(tempMin < tempMax){

				min = tempMin;
				max = tempMax;

				return [min, max];
			}

			if(tempMin > tempMax){

				min = tempMax;
				max = tempMin;

				return [min, max];
			}
		}

		return [min, max];
	}
};
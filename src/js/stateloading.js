window.StateLoading = {

	setPercentage(p){

		idStateLoading.style.width = p+'vw';

		Debounce(() => {

			if(p < 100){
				idStateLoading.style.height = null;
			}

			if(p == 100){
				idStateLoading.style.height = '0px';
			}

		}, 1500, 'StateLoading');
	}
};
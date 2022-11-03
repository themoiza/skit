window.LockScreen = {

	/**
	 * PARAMS
	 * blur: bool, blur body
	 * timeout: integer, mili seconds, not required, default 60000, 60 seconds
	 * spinner: bool
	 */

	title:  `Wait a moment`,
	timeout:  60000,
	blur:  false,
	spinner: '',

	lock: (config) => {

		var spinner = '';

		if(config){

			if(config.timeout){
				LockScreen.timeout = config.timeout;
			}
			if(config.title){
				LockScreen.title = config.title;
			}

			if(config.blur && config.blur === true){
				LockScreen.blur = true;
			}

			if(config.spinner && config.spinner === true){
				LockScreen.spinner = `<span class="LockScreenSpinner"></span>`;
			}
		}

		if(document.getElementById('IdLockScreen')){

			var div = document.getElementById('IdLockScreen');
			div.innerHTML = LockScreen.spinner+LockScreen.title;

		}else{

			var div = document.createElement('dialog');
			div.setAttribute('id', 'IdLockScreen');
			div.innerHTML = LockScreen.spinner+LockScreen.title;
			document.body.appendChild(div);
		}


		if(LockScreen.blur){
			document.body.style.filter = 'blur(3px)';
		}

		document.getElementById('IdLockScreen').showModal();

		if(LockScreen.timeout > -1){

			document.getElementById('IdLockScreen').style = `animation-duration: `+LockScreen.timeout+`ms`;

			Debounce(() => {
				LockScreen.unlock();
			}, LockScreen.timeout, 'IdLockScreen');
		}
	},
	unlock: () => {

		document.getElementById('IdLockScreen').close();
		document.body.style.filter = null;
	}
};
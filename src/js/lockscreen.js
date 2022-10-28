window.LockScreen = {

	mask:  `<span class="LockScreenSpinner"></span>`+`Wait a moment`,
	timeout:  60000,

	lock: (config) => {

		if(config){

			if(config.timeout){
				LockScreen.timeout = config.timeout;
			}

			if(config.title){

				LockScreen.mask = `<span class="LockScreenSpinner"></span>`+config.title;
			}
		}

		if(document.getElementById('IdLockScreen')){
			var div = document.getElementById('IdLockScreen');
			div.innerHTML = LockScreen.mask;
		}else{
			var div = document.createElement('dialog');
			div.setAttribute('id', 'IdLockScreen');
			div.innerHTML = LockScreen.mask;
			document.body.appendChild(div);
		}

		document.getElementById('IdLockScreen').style = `animation-duration: `+LockScreen.timeout+`ms`;

		document.getElementById('IdLockScreen').showModal();

		Debounce(() => {
			LockScreen.unlock();
		}, LockScreen.timeout, 'IdLockScreen');
	},
	unlock: () => {

		document.getElementById('IdLockScreen').close();

	}
};

// LoadLockScreen is allowed, html exists, will be opened
if(document.getElementById('idLoadLockScreen') && Skit.hasLoadLockScreen()){

	var el = document.getElementById('idLoadLockScreen');

	document.addEventListener('DOMContentLoaded', () => {

		document.body.classList.add('NoScroll');

		window.setTimeout(() => {
			el.classList.add('LoadLockScreenIn');
			document.body.classList.remove('NoScroll');
		}, 1000);
	});

	window.addEventListener('unload', (e) => {

		window.requestAnimationFrame(() => {
			el.classList.remove('LoadLockScreenIn');
			el.classList.add('LoadLockScreenOut');
			document.body.classList.add('NoScroll');
		});
	});
}

// LoadLockScreen is not allowed but html exists, will be removed
if(document.getElementById('idLoadLockScreen') && !Skit.hasLoadLockScreen()){

	var el = document.getElementById('idLoadLockScreen');
	el.parentNode.removeChild(el);
}
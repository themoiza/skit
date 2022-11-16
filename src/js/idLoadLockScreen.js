if(document.getElementById('idLoadLockScreen') && Skit.hasLoadLockScreen()){

	var el = document.getElementById('idLoadLockScreen');

	document.addEventListener('DOMContentLoaded', () => {
		document.body.classList.add('NoScroll');

		window.setTimeout(() => {
			el.classList.add('LoadLockScreenIn');
			document.body.classList.remove('NoScroll');
		}, 1000);
	});

	window.addEventListener('beforeunload', (e) => {

		window.requestAnimationFrame(() => {
			el.classList.remove('LoadLockScreenIn');
			el.classList.add('LoadLockScreenOut');
			document.body.classList.add('NoScroll');
		});
	});
}

if(document.getElementById('idLoadLockScreen') && !Skit.hasLoadLockScreen()){

	var el = document.getElementById('idLoadLockScreen');
	el.parentNode.removeChild(el);
}
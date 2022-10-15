window.matchMedia('(prefers-color-scheme: dark)').addListener(function (e) {
	Darkmode.load();
});

window.Darkmode = {

	options: ['1', '2', '3'],

	set: (dark) => {

		if(dark){
			document.body.classList.add('DarkMode');
			document.body.classList.remove('LightMode');
		}else{
			document.body.classList.remove('DarkMode');
			document.body.classList.add('LightMode');
		}

		Darkmode._listen(localStorage.getItem('skitConfigTheme'), dark);
	},

	_listen: (c, dark) => {

		var els = document.querySelectorAll('[data-skit-listen=darkmode]');
		els.forEach((el) => {

			if(el.nodeName == 'SELECT'){
				el.value = c;
			}

			if(el.nodeName == 'INPUT' && el.type == 'checkbox'){
				el.checked = dark;
			}
		});
	},

	load: () => {

		if(!localStorage.getItem('skitConfigTheme')){

			Darkmode.config('3');

		}else{

			Darkmode.config(localStorage.getItem('skitConfigTheme'));
		}
	},

	config: (c) => {

		var dark = true;

		if(Darkmode.options.includes(c)){

			localStorage.setItem('skitConfigTheme', c);

			// DARK
			if(c == '1'){

				dark = true;
				localStorage.setItem('skitDarkMode', 'true');
			}

			// LIGHT
			if(c == '2'){

				dark = false;
				localStorage.setItem('skitDarkMode', 'false');
			}

			// SYSTEM
			if(c == '3'){

				// SYSTEM DARK
				if(window.matchMedia('(prefers-color-scheme: dark)').matches == true){
					dark = true;
				}

				// SYSTEM LIGHT
				if(window.matchMedia('(prefers-color-scheme: light)').matches == true){
					dark = false;
				}
				localStorage.setItem('skitDarkMode', 'system');
			}
		}

		Darkmode.set(dark);

		Darkmode._listen(c, dark);
	}
};

Darkmode.load();
window.Warning = (obj) => {

	/**
	 * PARAMS
	 * title: string required
	 * message: string not required
	 * color: string not required
	 * timeout: integer, mili seconds, not required, default 8000
	 * id: string not required
	 * position: not required default 8
	 * - 1: left bottom,
	 * - 2: center bottom,
	 * - 3: right bottom,
	 * - 4: left center,
	 * - 6: right center,
	 * - 7: top left,
	 * - 8: top center, default,
	 * - 9: top right
	 */

	var colors = ['danger', 'pri', 'sec', 'dark', 'light'];
	var positions = {
		1: 'Warning-Left-Bottom',
		2: 'Warning-Center-Bottom',
		3: 'Warning-Right-Bottom',
		4: 'Warning-Left-Center',
		6: 'Warning-Right-Center',
		7: 'Warning-Left-Top',
		8: 'Warning-Center-Top',
		9: 'Warning-Right-Top'
	};

	var warnLimit = 5;

	if(obj.title && obj.title != ''){

		var title = String(obj.title);
		var message = String(obj.message ?? '');
		var color = String(obj.color ?? '');
		var timeout = obj.timeout ?? 8000;

		// encodeURIComponent is for security, prevent xss
		var id = encodeURIComponent(String(obj.id ?? 'warning-id-1'));
		var position = obj.position ?? 8;

		// VALIDATE COLORS
		if(colors.includes(color)){

			color = 'Warning-'+colors[colors.indexOf(color)];

		// NOT VALID COLORS
		}else{
			color = '';
		}

		// VALIDATE POSITIONS
		if(positions[position]){

			position = positions[position];

		// NOT VALID COLORS
		}else{
			position = positions[8];
		}

		var warn;

		var mask = `<div style="animation-duration: `+timeout+`ms" class="Warning `+color+`" data-id="`+id+`">
				<div>
					<div class="title">`+title+`</div>
					<div>`+message+`</div>
				</div>
				<div><button class="Warning-close">⨉</button></div>
			</div>`;

		// WARNING EXISTS
		if(document.getElementById('Warning')){

			warn = document.getElementById('Warning');
			warn.setAttribute('class', position);

		// WARNING NOT EXISTS
		}else{

			warn = document.createElement('div');
			warn.setAttribute('id', 'Warning');
			warn.setAttribute('class', position);
			document.body.appendChild(warn);

			warn.addEventListener('click', (e) => {

				var el = e.target;
				if(e.target.nodeName == 'I'){
					el = el.parentElement;
				}

				if(el.nodeName == 'BUTTON'){

					var warnLine = el.parentElement.parentElement;

					var parent = warnLine.parentElement;
					parent.removeChild(warnLine);
				}

			}, true);
		}

		/* REMOVE EMPTY CANVAS */
		var removes = warn.querySelectorAll('.Warning-canvas');
		removes.forEach(function(el){

			if(el.innerHTML == ''){
				var parent = el.parentElement;
				parent.removeChild(el);
			}
		});

		var warnLine = warn.querySelector('div[data-id="'+id+'"]');

		var totalCanvas = warn.querySelectorAll('div[data-id]');

		// CREATE NEW WARNING
		if(!warnLine){

			// LIMIT OF WARNS
			if(totalCanvas.length < warnLimit){

				var warnLine = document.createElement('div');
				warnLine.setAttribute('class', 'Warning-canvas');
				warnLine.innerHTML = mask;

				warn.appendChild(warnLine);

				Debounce(() => {

					if(typeof(warnLine) !== 'undefined' && typeof(warnLine.parentElement) !== 'undefined'){

						try{

							warnLine.parentElement.removeChild(warnLine);
						}catch{

						}
					}
				}, timeout, id);
			}

		/* UPDATE WARNING */
		}else if(warnLine){

			warnLine.setAttribute('class', `Warning `+color);

			warnLine.innerHTML = `<div>
					<div class="title">`+title+`</div>
					<div>`+message+`</div>
				</div>
				<div><button class="Warning-close">⨉</button></div>`;
		}
	}
};
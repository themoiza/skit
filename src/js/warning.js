window.Warning = (obj) => {

	/**
	 * PARAMS
	 * title: string required
	 * message: string not required
	 * color: string not required
	 * timeout: integer, mili seconds, not required, default 10000
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
		1: 'WarningLeftBottom',
		2: 'WarningCenterBottom',
		3: 'WarningRightBottom',
		4: 'WarningLeftCenter',
		6: 'WarningRightCenter',
		7: 'WarningLeftTop',
		8: 'WarningCenterTop',
		9: 'WarningRightTop'
	};

	if(obj.title && obj.title != ''){

		var title = String(obj.title);
		var message = String(obj.message ?? '');
		var color = String(obj.color ?? '');
		var timeout = obj.timeout ?? 10000;
		var position = obj.position ?? 8;

		// CREATE RANDOM ID
		var id = 'warning'+(Math.random()*1000000).toFixed(0);
		if(obj.id !== false){
			// prevent xss
			id = encodeURIComponent(obj.id);
		}

		// VALIDATE COLORS
		if(colors.includes(color)){

			var cl = colors[colors.indexOf(color)];
			cl = cl.charAt(0).toUpperCase() + cl.slice(1);

			color = 'Warning'+cl;

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

		if(timeout > -1){

			var mask = `<div style="animation-duration: `+timeout+`ms" class="Warning `+color+`" data-id="`+id+`">
					<div>
						<div class="WarningTitle">`+title+`</div>
						<div>`+message+`</div>
					</div>
					<div><button class="WarningClose"></button></div>
				</div>`;

		}else{

			var mask = `<div class="Warning `+color+`" data-id="`+id+`">
					<div>
						<div class="WarningTitle">`+title+`</div>
						<div>`+message+`</div>
					</div>
					<div><button class="WarningClose"></button></div>
				</div>`;
		}

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
		var removes = warn.querySelectorAll('.WarningCanvas');
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
			if(totalCanvas.length < Skit.getWaringLimit()){

				var warnLine = document.createElement('div');
				warnLine.setAttribute('class', 'WarningCanvas');
				warnLine.innerHTML = mask;

				warn.appendChild(warnLine);

				if(timeout > -1){

					Debounce(() => {

						if(typeof(warnLine) !== 'undefined' && typeof(warnLine.parentElement) !== 'undefined'){

							try{

								warnLine.parentElement.removeChild(warnLine);
							}catch{

							}
						}
					}, timeout, id);
				}
			}

		/* UPDATE WARNING */
		}else if(warnLine){

			warnLine.setAttribute('class', `Warning `+color);

			warnLine.innerHTML = `<div>
					<div class="WarningTitle">`+title+`</div>
					<div>`+message+`</div>
				</div>
				<div><button class="WarningClose"></button></div>`;
		}
	}
};
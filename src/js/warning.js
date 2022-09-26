window.Warning = {

	show: function(obj){

		if(obj.title){

			var color = '';
			if(obj.color){

				if(obj.color == 'danger'){
					color = 'Warning-danger';
				}

				if(obj.color == 'pri'){
					color = 'Warning-pri';
				}

				if(obj.color == 'sec'){
					color = 'Warning-sec';
				}

				if(obj.color == 'dark'){
					color = 'Warning-dark';
				}

				if(obj.color == 'light'){
					color = 'Warning-light';
				}
			}

			var warn;
			var warningDelay = 8000;
			var id = 'warning';

			if(obj.timeout){
				warningDelay = obj.timeout;
			}

			var mask = `<div style="animation-duration: `+warningDelay+`ms" class="Warning `+color+`" data-id="{{id}}">
					<div>
						<div class="title">`+obj.title+`</div>
						<div>`+obj.message+`</div>
					</div>
					<div><button class="Warning-close">⨉</button></div>
				</div>`;

			if(obj.id){
				id = obj.id.replace('"', '');
			}

			mask = mask.split('{{id}}').join(id);

			if(document.getElementById('Warning')){

				warn = document.getElementById('Warning');

			}else{

				warn = document.createElement('div');
				warn.setAttribute('id', 'Warning');
				document.body.appendChild(warn);

				warn.addEventListener('click', (e) => {

					var el = e.target;
					if(e.target.nodeName == 'I'){
						el = el.parentElement;
					}

					if(el.nodeName == 'BUTTON'){

						var warnline = el.parentElement.parentElement;

						var parent = warnline.parentElement;
						parent.removeChild(warnline);
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

			var warnline = warn.querySelector('div[data-id="'+id+'"]');

			var tcanvas = warn.querySelectorAll('div[data-id]');

			if(!warnline){

				// LIMIT OF WARNS
				if(tcanvas.length < 5){

					var warnline = document.createElement('div');
					warnline.setAttribute('class', 'Warning-canvas');
					warnline.innerHTML = mask;

					warn.appendChild(warnline);

					Debounce(() => {

						if(typeof(warnline) !== 'undefined' && typeof(warnline.parentElement) !== 'undefined'){

							try{

								warnline.parentElement.removeChild(warnline);
							}catch{

							}
						}
					}, warningDelay, id);
				}

			/* UPDATE WARNING */
			}else if(warnline){

				warnline.setAttribute('class', `Warning `+color);

				warnline.innerHTML = `
					<div>
						<div class="title">`+obj.title+`</div>
						<div>`+obj.message+`</div>
					</div>
					<div><button class="Warning-close">⨉</button></div>`;
			}
		}
	}
};
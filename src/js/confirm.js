window.Confirm = function(obj){

	if(obj.ok){

		let message = '';
		if(obj.message){
			message = `<div class="Confirm-message">`+obj.message+`</div>`;
		}

		let mask = `
			<div class="Confirm no-select">
				<div class="Confirm-title">`+obj.title+`</div>
				`+message+`
				<div class="Confirm-actions">
					<button id="Confirm-ok" class="`+obj.okclass+`">`+obj.ok+`</button>
				</div>
			</div>`;

		if(obj.no !== false){

			mask = `
				<div class="Confirm no-select">
					<div class="Confirm-title">`+obj.title+`</div>
					`+message+`
					<div class="Confirm-actions">
						<button id="Confirm-ok" class="`+obj.okclass+`">`+obj.ok+`</button> <button id="Confirm-no" class="`+obj.noclass+`">`+obj.no+`</button> 
					</div>
				</div>`;
		}

		if(document.getElementById('Confirm')){
			var div = document.getElementById('Confirm');
			div.innerHTML = mask;
		}else{
			var div = document.createElement('div');
			div.setAttribute('id', 'Confirm');
			div.innerHTML = mask;
			document.body.appendChild(div);
		}

		div.classList.remove('hidden');

		if(document.getElementById('Confirm-ok')){
			document.getElementById('Confirm-ok').focus();
		}

		div.addEventListener('click', (e) => {

			if(div === e.target){

				div.classList.add('hidden');

				if(obj.cancelFn){
					obj.cancelFn();
				}
			}
		});

		document.getElementById('Confirm-ok').addEventListener('click', (e) => {

			div.classList.add('hidden');

			if(obj.okFn){
				obj.okFn();
			}
		});

		document.getElementById('Confirm-ok').addEventListener('keyup', (e) => {

			if(e.keyCode == 13){

				div.classList.add('hidden');

				if(obj.okFn){
					obj.okFn();
				}
			}
		});

		document.getElementById('Confirm-no').addEventListener('click', (e) => {

			div.classList.add('hidden');

			if(obj.noFn){
				obj.noFn();
			}
		});

		document.getElementById('Confirm-no').addEventListener('keyup', (e) => {

			if(e.keyCode == 13){
				div.classList.add('hidden');
				obj.noFn();
			}
		});
	}
};


window.Copy = (id) => {

	var el = document.getElementById(id);

	if(el){

		var tx = document.createElement('textarea');
		tx.textContent = el.textContent.replace(/\s+$/, '').replace(/^\s+/, '');
		tx.focus();
		tx.classList.add('hidden');
		tx.style.width = '1px';
		tx.style.height = '1px';
		el.appendChild(tx);
		tx.select();
		document.execCommand('copy');
	
		window.setTimeout(() => {
			tx.parentNode.removeChild(tx);
		}, 10);
	}
};
window.Confirm = function(obj){

	if(obj.ok){

		let message = '';
		if(obj.message){
			message = `<div class="ConfirmMessage">`+obj.message+`</div>`;
		}

		let mask = `
			<div class="Confirm NoSelect">
				<div class="ConfirmTitle">`+obj.title+`</div>
				`+message+`
			</div>
			<div class="ConfirmActions">
				<button id="Confirm-ok" class="`+obj.okclass+`">`+obj.ok+`</button>
			</div>`;

		if(obj.no !== false){

			mask = `
				<div class="Confirm NoSelect">
					<div class="ConfirmTitle">`+obj.title+`</div>
					`+message+`
				</div>
				<div class="ConfirmActions">
					<button id="Confirm-ok" class="`+obj.okclass+`">`+obj.ok+`</button> <button id="Confirm-no" class="`+obj.noclass+`">`+obj.no+`</button> 
				</div>`;
		}

		if(document.getElementById('Confirm')){
			var div = document.getElementById('Confirm');
			div.innerHTML = mask;
		}else{
			var div = document.createElement('dialog');
			div.setAttribute('id', 'Confirm');
			div.innerHTML = mask;
			document.body.appendChild(div);
		}

		document.getElementById('Confirm').showModal();
		document.body.classList.add('NoScroll');

		if(document.getElementById('Confirm-ok')){
			document.getElementById('Confirm-ok').focus();
		}

		div.addEventListener('click', (e) => {

			if(div === e.target){

				document.getElementById('Confirm').close();
				document.body.classList.remove('NoScroll');

				if(obj.cancelFn){
					obj.cancelFn();
				}
			}
		});

		document.getElementById('Confirm-ok').addEventListener('click', (e) => {

			document.getElementById('Confirm').close();
			document.body.classList.remove('NoScroll');

			if(obj.okFn){
				obj.okFn();
			}
		});

		document.getElementById('Confirm-ok').addEventListener('keyup', (e) => {

			if(e.keyCode == 13){

				document.getElementById('Confirm').close();
				document.body.classList.remove('NoScroll');

				if(obj.okFn){
					obj.okFn();
				}
			}
		});

		document.getElementById('Confirm-no').addEventListener('click', (e) => {

			document.getElementById('Confirm').close();
			document.body.classList.remove('NoScroll');

			if(obj.noFn){
				obj.noFn();
			}
		});

		document.getElementById('Confirm-no').addEventListener('keyup', (e) => {

			if(e.keyCode == 13){

				document.getElementById('Confirm').close();
				document.body.classList.remove('NoScroll');
				obj.noFn();
			}
		});
	}
};


window.Copy = {

	id: (id) => {

		if(document.getElementById(id)){

			var el = document.getElementById(id);

			var tx = document.createElement('textarea');
			tx.textContent = el.value ?? el.textContent.replace(/\s+$/, '').replace(/^\s+/, '');
			tx.focus();
			tx.classList.add('hidden');
			tx.style.width = '1px';
			tx.style.height = '1px';
			document.body.appendChild(tx);
			tx.select();
			document.execCommand('copy');
		
			window.setTimeout(() => {
				tx.parentNode.removeChild(tx);
			}, 10);
		}
	},

	string: (t) => {

		var tx = document.createElement('textarea');
		tx.textContent = t;
		tx.focus();
		tx.classList.add('hidden');
		tx.style.width = '1px';
		tx.style.height = '1px';
		document.body.appendChild(tx);
		tx.select();
		document.execCommand('copy');
	
		window.setTimeout(() => {
			tx.parentNode.removeChild(tx);
		}, 10);
	}
};
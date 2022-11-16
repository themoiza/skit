window.Confirm = (obj) => {

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
				<button id="Confirm-ok" class="`+obj.okClass+`">`+obj.ok+`</button>
			</div>`;

		if(obj.no !== false){

			mask = `
				<div class="Confirm NoSelect">
					<div class="ConfirmTitle">`+obj.title+`</div>
					`+message+`
				</div>
				<div class="ConfirmActions">
					<button id="Confirm-ok" class="`+obj.okClass+`">`+obj.ok+`</button> <button id="Confirm-no" class="`+obj.noClass+`">`+obj.no+`</button> 
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

				if(obj.bdFn){
					obj.bdFn();
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

		if(document.getElementById('Confirm-no')){

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
	}
};
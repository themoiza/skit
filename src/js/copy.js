
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
/**
 * COPY
 * 
 * REQUISITOS
 * - SER O MAIS NATIVO POSSÍVEL
 * - Copiar partes texto em código HTML.
 * - Copiar selecionando por um ID
 * - Copiar uma string
 */

window.Copy = {

	// COPY BY ID ELEMENT
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

	// COPY STRING
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
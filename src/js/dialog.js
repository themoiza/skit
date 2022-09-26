window.Dialog = {

	open: (obj) => {

		obj.html = obj.html.split('{{dialogs}}').join('');

		if(!document.getElementById('boss-dialog')){
			var dialog = document.createElement('div');
			dialog.setAttribute('id', 'boss-dialog');

			var area = document.createElement('div');
			area.classList.add('boss-dialog-area');
			area.innerHTML = obj.html;

			dialog.appendChild(area);
			document.body.appendChild(dialog);

		}else{

			var dialog = document.getElementById('boss-dialog');
			dialog.classList.remove('hidden');
			dialog.innerHTML = '';

			var area = document.createElement('div');
			area.classList.add('boss-dialog-area');
			area.innerHTML = obj.html;

			if(obj.close){
				area.appendChild(c);
			}

			dialog.appendChild(area);

		}

		if(obj.invisible){
			area.classList.add('boss-dialog-invisible');
		}

		Boss.evts.add(Boss.evtTouchUp(), document.getElementById('boss-dialog-close'), function(evts){

			Boss.dialog.close();

			if(obj.callBack && typeof(obj.callBack) === 'function'){
				obj.callBack();
			}
		});
	},
	close: function(){

		if(document.getElementById('boss-dialog')){

			var dialog = document.getElementById('boss-dialog');
			dialog.classList.add('hidden');
			dialog.innerHTML = '';

		}
	}
};
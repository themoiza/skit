class Superselect{

	constructor(id){

		this.lastEvent = 'none';
		
		if(document.getElementById(id)){

			this.comp = document.getElementById(id);

			this.label = this.comp.querySelector('.SuperSelectLabel');

			this.label.addEventListener('click', (e) => {

				if(this.lastEvent == 'click'){

					this.comp.blur();
					this.lastEvent = 'blur';
				}

				this.lastEvent = 'click';
			});

			this.comp.addEventListener('focus', (e) => {

				this.lastEvent = 'focus';
			});

			this.comp.addEventListener('focusin', (e) => {

				this.lastEvent = 'focusin';
			});
		}
	}
}
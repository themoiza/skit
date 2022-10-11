class Modal{

	constructor(id){

		this.initX = 0;
		this.initY = 0;
		this.canMove = false;

		this.comp = document.getElementById(id);

		this.move = this.comp.querySelector('.Move');

		this.initMove();

		this.comp.addEventListener('click', () => {
			this.setFocus();
		});
	}

	initMove(){

		document.addEventListener('mousedown', (evt) => {

			if(evt.target == this.move){

				this._setZIndex(this._getZIndex());

				this.canMove = true;

				var rect = this.move.getBoundingClientRect();

				this.initX = this.comp.offsetLeft + evt.x - rect.x;
				this.initY = this.comp.offsetTop + evt.y - rect.y;

				document.addEventListener('mousemove', this.handleMove);
			}
		});

		document.addEventListener('mouseup', (evt) => {

			this.canMove = false;
			document.removeEventListener('mousemove', this.handleMove);
		});
	}

	handleMove = (evt) => {

		if(this.canMove === true){

			window.requestAnimationFrame(() => {
				this.comp.style.transform = 'translate('+(evt.x - this.initX).toFixed(0)+'px, '+(evt.y - this.initY).toFixed(0)+'px)';
			});
		}
	}

	_getZIndex(){

		var diags = document.querySelectorAll('dialog');

		var zIndex = 0;

		diags.forEach((diag) => {

			if(this.comp != diag){

				var temp = Number(window.document.defaultView.getComputedStyle(diag).getPropertyValue('z-index'));

				if(temp >= zIndex){
					zIndex = temp;
				}
			}
		});

		zIndex++;

		return zIndex;
	}

	_setZIndex(z){
		this.comp.style.zIndex = z;
	}

	setTitle(t){

		this.title = t.substring(0, 50);
		this.comp.querySelector('.Move').textContent = this.title;
	}

	setContent(h){

		this.comp.querySelector('.ModalContent').innerHTML = h;
	}

	setFocus(){

		this._setZIndex(this._getZIndex());
	}

	open(){

		this.comp.show();

		this._setZIndex(this._getZIndex());
	}

	close(){

		this.comp.close();

		this.initX = 0;
		this.initY = 0;
		this.comp.style.transform = null;
		this.comp.style.zIndex = null;
	}
}
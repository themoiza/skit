class Modal{

	constructor(id){

		this.currentX = 0;
		this.currentY = 0;

		this.lastX = 0;
		this.lastY = 0;

		this.mouseX = 0;
		this.mouseY = 0;

		this.calls = [];

		this.data = new Object;

		this.canMove = false;

		this.comp = document.getElementById(id);

		this.move = this.comp.querySelector('.Move');

		this.initMove();

		this.comp.addEventListener('click', () => {
			this.setFocus();
		});
	}

	setData(o){

		if(typeof(o) === 'object'){

			for(var index in o) {

				this.data[index] = o[index];
			};
		}
	}

	unsetData(index){

		if(typeof(this.data[index]) !== 'undefined'){

			delete this.data[index];
		}
	}

	setCenter(){

		var viewX = document.documentElement.clientWidth || document.body.clientWidth;
		var viewY = document.documentElement.clientHeight || document.body.clientHeight;

		var rect = this.comp.getBoundingClientRect();

		this.currentX = (viewX / 2) - (rect.width / 2);
		this.currentY = (viewY / 2) - (rect.height / 2);

		this.lastX = this.currentX;
		this.lastY = this.currentY;

		this.comp.style.left = this.currentX+'px';
		this.comp.style.top = this.currentY+'px';
	}

	initMove(){

		document.addEventListener('mousedown', (evt) => {

			if(evt.target == this.move){

				this._setZIndex(this._getZIndex());

				this.canMove = true;

				this.mouseX = evt.x;
				this.mouseY = evt.y;

				this.currentX = this.lastX;
				this.currentY = this.lastY;

				this.currentX = Number(this.comp.style.left.replace('px', ''));
				this.currentY = Number(this.comp.style.top.replace('px', ''));

				document.addEventListener('mousemove', this.handleMove);
			}
		});

		document.addEventListener('touchstart', (evt) => {

			if(evt.target == this.move){

				this._setZIndex(this._getZIndex());

				this.canMove = true;

				this.mouseX = evt.touches[0].pageX;
				this.mouseY = evt.touches[0].pageY;

				this.currentX = this.lastX;
				this.currentY = this.lastY;

				this.currentX = Number(this.comp.style.left.replace('px', ''));
				this.currentY = Number(this.comp.style.top.replace('px', ''));

				document.addEventListener('touchmove', this.handleMove);
			}
		});

		document.addEventListener('mouseup', (evt) => {

			this.canMove = false;

			document.removeEventListener('mousemove', this.handleMove);
		});

		document.addEventListener('touchend', (evt) => {

			this.canMove = false;

			document.removeEventListener('touchmove', this.handleMove);
		});
	}

	handleMove = (evt) => {

		if(this.canMove === true){

			window.requestAnimationFrame(() => {

				var evtX = evt.x ?? evt.touches[0].pageX;
				var evtY = evt.y ?? evt.touches[0].pageY;

				this.lastX = (this.currentX + evtX - this.mouseX).toFixed(0)
				this.lastY = (this.currentY + evtY - this.mouseY).toFixed(0);

				this.comp.style.left = this.lastX+'px';
				this.comp.style.top = this.lastY+'px';
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

		if(zIndex <= 99){
			zIndex = 99;
		}

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

		Debounce(() => {
			this.comp.show();

			this.setCenter();

			this._call();

			this._setZIndex(this._getZIndex());
		}, 50, 'modal');
	}

	close(){

		this.comp.close();

		this.currentX = 0;
		this.currentY = 0;
		this.comp.style.transform = null;
		this.comp.style.zIndex = null;
	}

	_call(){

		this.calls.forEach((call) => {

			call();
		});
	}

	done(fn){

		if(typeof(fn) == 'function'){

			this.calls.push(fn);
		}
	}
}
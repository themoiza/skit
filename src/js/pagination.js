class Pagination{

	constructor(ids){

		this.currentPage = 1;
		this.byPage = 100;
		this.totalData = 0;
		this.totalPages = Number((this.totalData / this.byPage).toFixed(0));

		this.comp = [];
		this.left = [];
		this.right = [];
		this.all = [];

		this.fn = false;

		ids.forEach((id, i) => {

			if(document.getElementById(id)){

				this.comp[i] = document.getElementById(id);

				if(this.comp[i].querySelector('.PagLeft')){
					this.left[i] = this.comp[i].querySelector('.PagLeft');
				}

				if(this.comp[i].querySelector('.PagAll')){
					this.all[i] = this.comp[i].querySelector('.PagAll');
				}

				if(this.comp[i].querySelector('.PagRight')){
					this.right[i] = this.comp[i].querySelector('.PagRight');
				}
			}

			if(this.left[i]){

				this.left[i].addEventListener('click', (e) => {

					if(e.ctrlKey && e.shiftKey){

						this.previous(1000);

					}else if(e.ctrlKey){

						this.previous(100);

					}else if(e.shiftKey){

						this.previous(10);

					}else{

						this.previous(1);
					}
				});
			}

			if(this.right[i]){

				this.right[i].addEventListener('click', (e) => {

					if(e.ctrlKey && e.shiftKey){

						this.next(1000);

					}else if(e.ctrlKey){

						this.next(100);

					}else if(e.shiftKey){

						this.next(10);

					}else{

						this.next(1);
					}
				});
			}

			if(this.all[i]){

				this.all[i].addEventListener('click', (e) => {

					console.log('all');
				});
			}
		});

		this.setPage(1);
	}

	setCallBack(fn){
		this.fn = fn;
	}

	setPage(p){

		this.all.forEach((all, i) => {

			this.all[i].textContent = this.currentPage+' de '+this.totalPages+', '+this.totalData;
		});

		if(this.fn && typeof(this.fn) === 'function'){

			Debounce(() => {

				let fn = this.fn;
				fn();

			}, 200, 'pagination');
		}
	}

	setByPage(p){

		this.byPage = Number(p);
		this.setPage(this.currentPage);
	}

	setTotal(t){

		this.totalData = Number(t);
		this.totalPages = Number((this.totalData / this.byPage).toFixed(0));

		this.setPage(this.currentPage);
	}

	previous(n){

		if(this.currentPage - n >= 1){
			this.currentPage = Number(this.currentPage) - n;
		}

		this.setPage(this.currentPage);
	}

	next(n){

		if(this.currentPage + n <= this.totalPages){
			this.currentPage = Number(this.currentPage) + n;
		}

		this.setPage(this.currentPage);
	}

	getByPage(){

		return this.byPage;
	}

	getTotal(){

		return this.totalData;
	}

	getPage(){

		return this.currentPage;
	}
}
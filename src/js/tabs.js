class Tabs{

	constructor(id, area, conf){

		this.id = id;

		this.area = area;

		this.conf = conf;

		for(let x in this.conf){

			this.conf[x]['active'] = 'active';
		}

		this.vue = new Vue({
			el: '#'+this.id,
			template: `
				<div class="sk-tabs-btns">
					<div v-for="(t, i) in tabs" :class="t.active"><button @click="setTab(i)">{{t.tab}}</button></div>
				</div>`,
			data: {
				tabs: this.conf,
				component: this
			},
			methods: {

				setTab(i){

					for(let x in this.tabs){

						if(x == i){

							this.tabs[x]['active'] = 'active';

							this.component.setTab(this.tabs[x].for);

						}else{

							this.tabs[x]['active'] = '';
						}
					}
				}
			},
			created: function() {

				this.setTab(0);
			}
		});
	}

	setTab(index){

		let el = document.getElementById(this.area);

		if(el){

			let tabs = el.querySelectorAll('div[data-tab]');

			for(let dv of tabs){

				if(index == dv.getAttribute('data-tab')){

					dv.classList.remove('inactive');
					dv.classList.add('active');

				}else{

					dv.classList.add('inactive');
					dv.classList.remove('active');
				}
			}
		}
	}

	removeTab(index){

		// UPDATE
		this.buttons = this.tabHeader.querySelectorAll('button[data-index]');

		for(var b = 0; b < this.buttons.length; b++){

			if(Number(index) === Number(this.buttons[b].getAttribute('data-index'))){

				this.buttons[b].parentElement.removeChild(this.buttons[b]);
			}
		}

		// UPDATE
		this.buttons = this.tabHeader.querySelectorAll('button[data-index]');

		// GO TO FISRT TAB
		this.setTab();
	}

	addTab(tabNew){

	}

	init(config){

	}
}
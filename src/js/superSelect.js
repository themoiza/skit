/**
 * SUPER SELECT
 * 
 * REQUISITOS
 * - SER O MAIS NATIVO POSSÍVEL
 * - ABRIR COM EVENTO FOCUS
 * - FECHAR COM EVENTO BLUR
 * - ABRIR E FECHAR COM EVENTO CLICK
 * - ABRIR E FECHAR COM TAB DO TECLADO
 * - BUSCA
 * - BOTÃO PARA LIMPAR BUSCA
 * - SUPORTE DE GRUPOS
 * - AO ABRIR, ROLAR PARA O ITEM SELECIONADO
 * - SUPORTE COMPONENTE DISABLED
 * - SUPORTE A UM ITEM DISABLED
 * - SUPORTE MÚLTIPLAS SELECÕES
 * - FUNÇÕES
 * -- setValue()	sera valor selecionado (seleção única)
 * -- getValue()	retorna valor selecionado (seleção única)
 * -- setValues()	seta valores (modo de multiplas seleções)
 * -- getValues()	retorna os valores selecionados (modo de multiplas seleções)
 * -- addValue()	adiciona 1 valor
 * -- focus()		abre o componente e rola até o campo selecionado
 * -- reset() 		reseta componente para o estado inicial
 */


class Superselect{

	constructor(id, config){

		this.id = id;

		this.lastEvent = 'none';

		this.name = '';

		this.none = 'NONE';

		this.label = 'NONE';

		this.searchPlaceholder = 'search';

		this.list = [];

		this.value = '';

		this.active = null;

		if(config && config.list){

			if(config.name){
				this.name = config.name;
			}

			if(config.none){
				this.none = config.none;
			}

			if(config.list){
				this.list = config.list;
			}
		}

		this._computedList = this.list;

		if(document.getElementById(id)){

			this.comp = document.getElementById(id);

			this.comp.setAttribute('tabindex', '0');

			this._createLabel();
			this._createComp();

			this.labelComp = this.comp.querySelector('.SuperSelectLabel');
			this.labelComp.textContent = this.none;

			this.sComp = this.comp.querySelector('.SuperSelectComp');

			this._createSearch();
			this._createList();

			this.searchComp = this.sComp.querySelector('input');

			this.searchComp.setAttribute('placeholder', this.searchPlaceholder);

			this.listComp = this.comp.querySelector('.SuperSelectList');

			this.labelComp.addEventListener('click', (e) => {

				if(this.lastEvent == 'click'){

					this.comp.blur();
					this.lastEvent = 'blur';
				}

				this.lastEvent = 'click';
				this.active.scrollIntoView();
			});

			this.comp.addEventListener('focus', (e) => {

				this.lastEvent = 'focus';
			});

			this.comp.addEventListener('focusin', (e) => {

				this.lastEvent = 'focusin';
			});

			this.listComp.addEventListener('input', (e) => {

				this.label = e.target.parentElement.querySelector('label').textContent;
				this.labelComp.textContent = this.label;

				this.value = e.target.value;
				this.active = e.target;
			});

			this.searchComp.addEventListener('keyup', (e) => {

				Debounce(() => {

					this._filter(e.target.value);

				}, 500, 'superselect'+this.id);
			});

			this._render();
			this._load();
		}
	}

	_load(){

		var rds = this.listComp.querySelectorAll('input');

		rds.forEach((rd) => {

			if(rd.checked === true){

				this.value = rd.value;
				this.active = rd;
				this.label = rd.parentElement.querySelector('label').textContent;
			}
		});

		this.labelComp.textContent = this.label;
	}

	_filter(f){

		if(f == ''){

			this._computedList = this.list;

		}else{

			var temp = [];

			var exp = new RegExp(f, 'i');

			this.list.forEach((item, key) => {

				if(item.group && item.list){

					var tempGroupList = [];

					item.list.forEach((itemGroup, key) => {

						if(exp.test(itemGroup.label)){
	
							tempGroupList.push(itemGroup);
						}
					});

					if(tempGroupList.length > 0){

						temp.push({
							'group': item.group,
							'list': tempGroupList
						});
					}

				}else{

					if(exp.test(item.label)){

						temp.push(item);
					}
				}
			});

			this._computedList = temp;
		}

		this._render();
	}

	_render(){

		var render = '';

		this._computedList.forEach((item, key) => {

			if(item.group && item.list){

				render += `<div class="SuperSelectGroup">
					<div class="SuperSelectGroupTitle">`+item.group+`</div>`;

				item.list.forEach((itemGroup, key) => {

					var id = this._randId();

					var checked = '';
					if(String(this.value) === String(itemGroup.value)){
						checked = ' checked="checked"';
					}

					var disabled = '';
					if(itemGroup.disabled || item.disabled){
						disabled = ' disabled="disabled"';
					}

					render += `<div class="Option"><input type="radio"`+checked+disabled+` name="`+this.name+`" value="`+itemGroup.value+`" id="`+id+`" /><label for="`+id+`">`+itemGroup.label+`</label></div>`;
				});

				render += `</div>`;

			}else{

				var id = this._randId();

				var checked = '';
				if(String(this.value) === String(item.value)){
					checked = ' checked="checked"';
				}

				var disabled = '';
				if(item.disabled){
					disabled = ' disabled="disabled"';
				}

				render += `<div class="Option">
					<input type="radio"`+checked+disabled+`  name="`+this.name+`" value="`+item.value+`" id="`+id+`" /><label for="`+id+`">`+item.label+`</label>
				</div>`;
			}
		});

		this.listComp.innerHTML = render;
	}

	_createLabel(){

		if(!this.comp.querySelector('.SuperSelectLabel')){

			var label = document.createElement('div');
			label.setAttribute('class', 'SuperSelectLabel');
			label.textContent = this.label;

			this.comp.appendChild(label);
		}
	}

	_createComp(){

		if(!this.comp.querySelector('.SuperSelectComp')){

			var scomp = document.createElement('div');
			scomp.setAttribute('class', 'SuperSelectComp');

			this.comp.appendChild(scomp);
		}
	}

	_createSearch(){

		if(!this.sComp.querySelector('.SuperSelectSearch')){

			var search = document.createElement('div');
			search.setAttribute('class', 'SuperSelectSearch');

			if(!this.sComp.querySelector('input')){

				var inpt = document.createElement('input');
				inpt.setAttribute('type', 'search');
				inpt.setAttribute('placeholder', this.searchPlaceholder);

				search.appendChild(inpt);
			}

			this.sComp.appendChild(search);
		}
	}

	_createList(){

		if(!this.sComp.querySelector('.SuperSelectList')){

			var list = document.createElement('div');
			list.setAttribute('class', 'SuperSelectList');

			var id = this._randId();

			list.innerHTML = '<div class="Option"><input type="radio" name="'+this.name+'" value="" id="'+id+'" /><label for="'+id+'">'+this.none+'</label></div>';

			this.sComp.appendChild(list);
		}
	}

	_randId(){

		return 'opt'+(Math.random()*1000000000).toFixed(0);
	}

	addValue(value, label){
		this.list.push({'value': value, 'label': label});
		this._render();
	}

	getValue(){
		return this.value;
	}

	setValue(v){

		var rds = this.listComp.querySelectorAll('input');

		rds.forEach((rd) => {

			if(String(rd.value) === String(v)){

				rd.checked = true;
				this.value = rd.value;
				this.active = rd;

			}else{

				rd.checked = false;
			}
		});
		this._load();
	}

	setValues(v){
	}

	getValues(){
		return this.value;
	}

	focus(){
		this.comp.focus();
		this.active.scrollIntoView();
	}

	reset(){
		
	}
}
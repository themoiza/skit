window.Panic = {

	start(){

		document.body.classList.add('InPanic');

		Skit.virtualTop = 50;

		if(!document.getElementById('InPanic')){

			var p = document.createElement('div');
			p.setAttribute('id', 'InPanic');
			p.setAttribute('class', 'Panic');
			document.body.appendChild(p);
		}else{

			var p = document.getElementById('InPanic');
		}
		p.textContent = 'Estamos trabalhando para resolver os problemas...';
	},
	stop(){

		Skit.virtualTop = 0;

		document.body.classList.remove('InPanic');

		if(document.getElementById('InPanic')){
			var p = document.getElementById('InPanic');
			p.parentNode.removeChild(p);
		}
	}
};
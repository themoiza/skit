window.Skit = {

	virtualTop: 0,

	setConfig(c){

	},

	hasLoadLockScreen(){

		return SkitConfig.LoadLockScreen.allow ?? false;
	},

	hasPlusAnimations(){
		return true;
	},

	// NUMBER OF MAX WARNINGS TO DISPLAY
	getWaringLimit(){

		return SkitConfig.Warning.max ?? 5;
	}
};

if(typeof(SkitConfig) == 'undefined'){
	Skit.setConfig({});
}

window.startMVC = () => {

	if(SkitConfig.MVC.allow){

		window.mvc = new Mvc();
		mvc.init(SkitConfig.MVC.id);
	}
};

document.addEventListener('DOMContentLoaded', () => {

	startMVC();
	Darkmode.load();
});
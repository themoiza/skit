window.Skit = {

	setConfig(c){

	},

	hasLoadLockScreen(){
		return false;
	},

	hasPlusAnimations(){
		return true;
	}
};

if(typeof(SkitConfig) == 'undefined'){
	Skit.setConfig({});
}
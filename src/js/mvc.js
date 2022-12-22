window.pages = new Object;
window.currentPage = '/';
window.classes = new Object;
window.listenPopEvent = null;
window.popStateScroll = {};
window.appName = SkitConfig.MVC.appName;

class Mvc{

	constructor(){

		this.id;
		this.router = new Router;
		this.pushHistory = new PushHistory;
		this.pushHistory.init(this);

		window.screenId = this._randId();

		document.querySelector('meta[property="og:url"]').setAttribute('content', window.location.href);
	}

	_randId(){

		return Math.random().toString(36).substring(2);
	}

	_scrollToElementByHash(){

		if(window.location.hash && document.getElementById(window.location.hash.replace('#', ''))){

			document.getElementById(window.location.hash.replace('#', '')).scrollIntoView();
		}else{

			document.body.scrollIntoView();
		}
	}

	verifyAuth(){

		return false;
	}

	confirmAuth(){

	}

	responseError(status){

		if(status == 401){

			this.logoffFront();

		}else if(status == 403){

			this.pushHistory.go('/403');

		}

		return false;
	}

	logoffFront(){

	}

	init(id){

		if(document.getElementById(id)){

			this.id = document.getElementById(id);

			var controller = this.router.getController();
			var jsClass = this.router.getRouterController(controller);

			// PLATFORM IS AUTHENTICATED
			if(this.verifyAuth() === true){

				this.loadController();

			// PLATFORM IS NOT AUTHENTICATED
			}else{

				// REDIRECET TO LOGIN
				if(jsClass.middleware === 'auth'){

					window.open('/login', '_self');

				// ALLOW ALL noAuth PAGES
				}else{

					this.loadController();
				}
			}
		}
	}

	getBackTo(backTo){

		const urlSearchParams = new URLSearchParams(window.location.search);
		const params = Object.fromEntries(urlSearchParams.entries());

		if(params.backTo && params.backTo != ''){

			return params.backTo;

		}else{

			return backTo;
		}
	}

	getUri(){

		const urlSearchParams = new URLSearchParams(window.location.search);
		return urlSearchParams.toString();
	}

	getCurrentPage(){

		const urlSearchParams = new URLSearchParams(window.location.search);
		return window.location.pathname+'?'+urlSearchParams.toString();
	}

	loadPage(controller, loadScript){

		if(typeof(appServices) !== 'undefined'){
			appServices.closeMegaMenu();
			appServices.closeMenu();
		}

		var jsClass = this.router.getRouterController(controller);

		StateLoading.setPercentage(1);

		// LOAD SCRIPT
		if(typeof(window.classes[jsClass.class]) === 'undefined' && typeof(loadScript) === 'undefined' && jsClass.js !== false){

			var spt = document.createElement('script');
			spt.setAttribute('src', jsClass.js+'?temp='+Math.random());
			spt.addEventListener('load', () => {

				this.loadPage(controller, true);
				StateLoading.setPercentage(100);
			});
			document.body.appendChild(spt);

		}else{

			/* CONTROLLER DON'T EXIST */
			if(jsClass.http === 404){

				pages['page404'] = new Page404(this);
				pages['page404'].render(this.id);

			/* CONTROLLER DON'T EXIST */
			}else if(jsClass.http === 403){

				pages['page403'] = new Page403(this);
				pages['page403'].render(this.id);

			/* CONTROLLER DON'T EXIST */
			}else if(jsClass.http === 500){

				pages['page503'] = new Page500(this);
				pages['page503'].render(this.id);

			/* CONTROLLER EXIST BUT JS CLASS CONTROLLER DON'T EXIST */
			}else if(typeof(classes[jsClass.class]) === 'undefined'){

				pages['page500'] = new Page500(this);
				pages['page500'].render(this.id);

			/* CONTROLLER OK */
			}else{

				var dynamicClass = jsClass.class.toLowerCase();
				if(currentPage != dynamicClass){

					pages[dynamicClass] = null;
					pages[dynamicClass] = new classes[jsClass.class](this);
					pages[dynamicClass].render(this.id);

					// REMOVE OBJECT FROM BEFORE CLASS
					pages[currentPage] = null;
				}

				currentPage = dynamicClass;
			}

			this._scrollToElementByHash();

			StateLoading.setPercentage(100);
		}
	}

	loadController(){

		var controller = this.router.getController();
		this.loadPage(controller);
	}

	triggerPopState(){

		if(listenPopEvent !== null && typeof(listenPopEvent.get()) !== 'undefined'){

			listenPopEvent.get();
		}
	}

	addPopListener(obj){

		listenPopEvent = obj;
	}

	updateTitle(t){

		document.title = t+` - `+appName;
		document.querySelector('meta[property="og:title"]').setAttribute('content', t);
	}

	updateDescription(d){

		document.querySelector('meta[name="description"]').setAttribute('content', d);
		document.querySelector('meta[property="og:description"]').setAttribute('content', d);
	}
}

class Page403{

	constructor(app){

		this.app = app;
	}

	page(){

		return `403`;
	}

	render(el){

		var page = this.page();

		el.innerHTML = page;
	}
}

class Page404{

	constructor(app){

		this.app = app;
	}

	page(){

		return `404`;
	}

	render(el){

		var page = this.page();

		el.innerHTML = page;
	}
}

class Page500{

	constructor(app){

		this.app = app;
	}

	page(){

		return `<div class="Flex">
			<div class="ColFlex">
				<h1 class="TxCenter">Error 500</h1>
			</div>
		</div>`;
	}

	render(el){

		var page = this.page();

		el.innerHTML = page;
	}
}

class PushHistory {

	init (app){

		this.app = app;

		history.scrollRestoration = 'manual';

		window.addEventListener('popstate', (e) => {

			var host = window.location.protocol+'//'+window.location.host;
			var controller = window.location.href.replace(host, '');

			this.app.loadController();

			this.app.triggerPopState();

		}, true);

		window.addEventListener('click', (e) => {

			var elemt = e.target;

			var expJs = new RegExp('javascript:', 'i');
			var expFTP = new RegExp('ftp:', 'i');
			var expMail = new RegExp('mailto:', 'i');
			var expWhatsapp = new RegExp('whatsapp:', 'i');

			var domain = window.location.hostname;

			if(elemt.nodeName !== 'BUTTON' && elemt.parentElement !== null && elemt.parentElement.nodeName === 'BUTTON'){
				elemt = elemt.parentElement;
			}

			if(elemt.nodeName === 'BUTTON' && elemt.getAttribute('data-href') && elemt.getAttribute('data-href') !== false && e.button == 0){

				var hrefDomain = elemt.getAttribute('data-href').replace('http://', '');
				hrefDomain = hrefDomain.replace('https://', '');

				var re = new RegExp('^\/', 'i'); 

				if(re.test(hrefDomain) === true){
					hrefDomain = domain+hrefDomain;
				}

				var urlIn = new RegExp('^'+domain, 'i');

				if(urlIn.test(hrefDomain) === true){
					this.go(elemt.getAttribute('data-href'));
				}else{
					var a = document.createElement('a');
					a.href = elemt.getAttribute('data-href');
					EvtTrigger('click', a);
				}
			}else if(e.button == 0){

				var wl = true;

				while(wl === true){

					if(elemt.parentNode !== null && elemt.nodeName !== 'A'){
						elemt = elemt.parentNode;
					}else{
						wl = false;

						if(elemt.href){

							var hrefDomain = elemt.href.replace('http://', '');
							hrefDomain = hrefDomain.replace('https://', '');

							var urlIn = new RegExp('^'+domain, 'i');

							if(urlIn.test(hrefDomain) === true && !elemt.getAttribute('data-href') && !elemt.getAttribute('download') && (!elemt.getAttribute('target') || elemt.getAttribute('target') != '_blank')){

								if(expJs.test(elemt.href) === false || 
									expFTP.test(elemt.href) === false || 
									expMail.test(elemt.href) === false || 
									expWhatsapp.test(elemt.href) === false || 
									!elemt.getAttribute('data-href')){

									if(e.stopPropagation){
										e.stopPropagation();
									}
									if(e.preventDefault){
										e.preventDefault();
									}
									this.go(elemt.href);
								}
							}
						}
					}
				}
			}

		}, true);

		window.addEventListener('beforeunload', (e) => {

			e.cancelBubble = true;

			if(e.stopPropagation){
				e.stopPropagation();
			}

			if(e.preventDefault){
				e.preventDefault();
			}

			return false;

		}, true);
	}

	go (controller){

		var host = window.location.protocol+'//'+window.location.host;
		var ctrlpage = window.location.href.replace(host, '');
		ctrlpage = ctrlpage.replace(/\?.*$/, '');

		popStateScroll[ctrlpage] = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

		history.pushState(JSON.stringify({'page': controller}), '', controller);

		this.app.loadController();
	}

	goFront (controller){

		var host = window.location.protocol+'//'+window.location.host;
		var ctrlpage = window.location.href.replace(host, '');
		ctrlpage = ctrlpage.replace(/\?.*$/, '');

		popStateScroll[ctrlpage] = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

		history.pushState(JSON.stringify({'page': controller}), '', controller);
	}
}

class Router{

	routersControllers(){

		return SkitConfig.MVC.routes;
	}

	getController(){

		var path = window.location.pathname;
		path = path.split('/');

		var makeCtrl = new Array();
		for(var p = 0; p < path.length; p++){

			if(path[p] != ''){
				makeCtrl.push(path[p]);
			}
		}

		var controller = '/';
		if(makeCtrl.length > 0){
			controller = makeCtrl.join('/');
		}

		return controller;
	}

	getPath(){

		var path = window.location.pathname;
		path = path.split('/');

		var makePath = new Array();
		for(var p = 0; p < path.length; p++){

			if(path[p] != ''){
				makePath.push(path[p]);
			}
		}

		return makePath;
	}

	getRouterController(controller){

		var routers = this.routersControllers();

		var http = 404;
		var jsClass = 'Index';
		var js = '/js/pages/index.js';
		var middleware = 'noAuth';
		
		if(controller == '500'){

			http = 500;
			jsClass = 'Page500';
			js = false;
			middleware = 'noAuth';

		}else if(controller == '403'){

			http = 403;
			jsClass = 'Page403';
			js = false;
			middleware = 'noAuth';

		}else if(routers['noAuth'][controller]){

			http = 200;
			jsClass = routers['noAuth'][controller].split('::')[0];
			js = routers['noAuth'][controller].split('::')[1];
			middleware = 'noAuth';

		}else if(routers['auth'][controller]){

			http = 200;
			jsClass = routers['auth'][controller].split('::')[0];
			js = routers['auth'][controller].split('::')[1];
			middleware = 'auth';
		}

		return {
			'middleware': middleware,
			'http': http,
			'class': jsClass,
			'js': js
		}
	}
}
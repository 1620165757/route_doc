class Router {
    constructor() {
        this.routes = {};
        this.currentUrl = '';
    }

    /*注册路由*/
    route(path, callback) {
        this.routes[path] = callback || function () {
        };
    }

    updateView(url) {
        this.currentUrl = url;
        this.routes[this.currentUrl] && this.routes[this.currentUrl]();
    }

    bindLink() {
        const allLink = document.querySelectorAll('a[data-href]');
        for (let i = 0, len = allLink.length; i < len; i++) {
            const current = allLink[i];
            console.log(allLink[i]);
            current.addEventListener('click', e => {
                e.preventDefault();
                const url = current.getAttribute('data-href');
                history.pushState({}, null, url);
                this.updateView(url);
            }, false);
        }
    }

    init() {
        this.bindLink();
        window.addEventListener('popstate', e => {
            console.log(window.location.pathname);
            this.updateView(window.location.pathname);
        });
        window.addEventListener('load', () => this.updateView('/'), false);
    }
}
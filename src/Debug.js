class Debug {
    constructor(element = document.createElement('p')) {
        this.element = element;

        this.attach();
    }

    /**
     * Attach to DOM
     */
    attach(parent = document.body) {
        parent.appendChild(this.element);
    }

    log(value) {
        this.element.innerText = value;
    }
}

window.debug = new Debug();

export default window.debug;

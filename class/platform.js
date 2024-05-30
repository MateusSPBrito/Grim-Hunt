class Platform {
    constructor(x, y, width, height, container) {
        this.x = x
        this.y = 400 - y - height
        this.width = width
        this.height = height
        this.element
        this.createElement(container)
    }

    createElement(container) {
        this.element = document.createElement('div');
        this.element.classList = 'platform';
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.width = `${this.width}px`
        this.element.style.height = `${this.height}px`
        container.appendChild(this.element);
    }
}
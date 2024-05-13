class Entity {
    constructor(x, y, size, container, plataforms, hearts = 0) {
        this.x = x;
        this.y = 400 - size - y;
        this.speed = 0
        this.element
        this.width = size
        this.height = size
        this.plataforms = plataforms
        this.hearts = hearts
        this.heartsContainer
    }

    _createElement(container) {
        this.element = document.createElement('div');
        this.element.classList = 'entity';
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.width = `${this.width}px`
        this.element.style.height = `${this.height}px`
        container.appendChild(this.element);
    }

    _setAppearance(element, frame = heartIcon) {
        element.innerHTML = ''
        for (let colors of frame) {
            for (let color of colors) {
                let pixel = document.createElement('div')
                pixel.setAttribute('class', 'pixel')
                if (color != null) pixel.style.backgroundColor = `#${color}`
                else pixel.style.backgroundColor = `transparent`
                pixel.style.height = `${this.height / 20}px`
                pixel.style.width = `${this.height / 20}px`
                element.appendChild(pixel)
            }
        }
    }
}
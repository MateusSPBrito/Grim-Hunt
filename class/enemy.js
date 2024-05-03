class Enemy {
    constructor(x, y, size, container, plataforms) {
        this.x = x;
        this.y = y;
        if (this.x <= 350) this.speed = 1
        else this.speed = -1
        this.element
        this.width = size
        this.height = size
        this.plataforms = plataforms

        this._createElement(container)
    }

    _createElement(container) {
        if (this._checkCollision(true)) return

        this.element = document.createElement('div');
        this.element.classList = 'enemy';
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.width = `${this.width}px`
        this.element.style.height = `${this.height}px`
        container.appendChild(this.element);

        this._setAppearance()
        this._walk()
    }

    _setAppearance(i = 0, oldAction = null) {
        const frame = stopSkull

        this.element.innerHTML = ''
        for (let colors of frame) {
            for (let color of colors) {
                let pixel = document.createElement('div')
                pixel.setAttribute('class', 'pixel')
                if (color != null) pixel.style.backgroundColor = `#${color}`
                else pixel.style.backgroundColor = `transparent`
                pixel.style.height = `${this.height / 20}px`
                pixel.style.width = `${this.height / 20}px`
                this.element.appendChild(pixel)
            }
        }
    }

    _walk() {
        while (1) {
            const checkCollision = this._checkCollision()

            if (!checkCollision) break

            this.speed *= -1
        }

        this.x += this.speed;
        this.element.style.left = `${this.x}px`

        requestAnimationFrame(() => this._walk())
    }

    _checkCollision(start = false) {
        if (this.x + this.speed < 0 || this.x + this.speed > 800 - this.width) return true
        for (const plataform of this.plataforms) {

            if (
                !start &&
                this.y + this.height == plataform.y &&
                (this.x + this.speed < plataform.x || this.x + this.width + this.speed > plataform.x + plataform.width)
            ) return true

            if (this.y + this.height > plataform.y && this.y < plataform.y + plataform.height) {
                if (
                    (this.speed > 0 && plataform.x < this.x + this.width + this.speed && plataform.x + plataform.width > this.x) ||
                    (this.speed < 0 && this.x + this.speed < plataform.x + plataform.width && this.x + this.width > plataform.x)
                ) return true
            }
        }
    }
}
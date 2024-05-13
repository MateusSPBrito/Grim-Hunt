class Enemy extends Entity {
    constructor(x, y, size, container, plataforms) {
        super(x, y, 60, container, plataforms, 3)
        this.x = x;
        this.y = 400 - size - y;
        this.speed = 0
        this.element
        this.width = size
        this.height = size
        this.plataforms = plataforms

        super._createElement(container)
        this._setAppearance(container)
        this._walk()
    }

    _setAppearance(container,i = 0) {
        const frame = stopSkull[i]

        super._setAppearance(this.element, frame)

        setTimeout(() => { this._setAppearance(container, i == 0 ? 1 : 0) }, i == 0 ? 1500 : 750);
    }

    _walk() {
        if (this.speed == 0) this.speed = 1
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
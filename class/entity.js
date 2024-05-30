class Entity {
    constructor(x, y, size, container, plataforms) {
        this.x = x;
        this.y = 400 - size - y;
        this.speedX = 0
        this.element
        this.width = size
        this.height = size
        this.plataforms = plataforms
    }

    createEntity(container) {
        this.element = document.createElement('div');
        this.element.classList = 'entity';
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.width = `${this.width}px`
        this.element.style.height = `${this.height}px`
        container.appendChild(this.element);
    }

    setSkin(frame = heartIcon) {
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

    gravity(){

    }

    walk(direction, speed) {
        const { collision, x } = this.checkHorizontalCollision(direction, speed)
        if (collision) this.x = x
        else this.x += direction == 'right' ? speed : -speed
        this.element.style.left = `${this.x}px`
        return collision
    }

    checkHorizontalCollision(direction, speed) {
        const nextPosition = this.x + (direction == 'right' ? speed : -speed)

        if (nextPosition < 0) return { collision: true, x: 0 }
        if (nextPosition > 800 - this.width) return { collision: true, x: 800 - this.width }

        for (const plataform of this.plataforms) {
            if (!(this.y + this.height > plataform.y && this.y < plataform.y + plataform.height)) continue

            if (nextPosition > plataform.x - this.width && nextPosition < plataform.x + plataform.width) {
                console.log(nextPosition, plataform)
                if (direction == 'left') return { collision: true, x: plataform.x + plataform.width }
                return { collision: true, x: plataform.x - this.width }

            }
        }

        return { collision: false }
    }
}
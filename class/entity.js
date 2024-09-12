class Entity {
    constructor(x, y, width, height, container, plataforms) {
        this.container = container
        this.x = x
        this.y = container.height - height - y
        this.speedX = 0
        this.speedY = 0
        this.element
        this.width = width
        this.height = height
        this.plataforms = plataforms
    }

    createEntity(container, color = null) {
        this.element = document.createElement('div');
        this.element.classList = 'entity';
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.width = `${this.width}px`
        this.element.style.height = `${this.height}px`
        if (color) this.element.style.backgroundColor = `${color}`
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

    gravity() {
        const { collision, y } = this.checkVerticalCollision(this.y + this.speedY)
        if (collision) {
            this.speedY = 0
            if (collision === 'bottom') this.y = y
        }

        else this.y += this.speedY
        this.element.style.top = `${this.y}px`
        this.speedY += 0.2

        let status
        if (Math.trunc(this.speedY) > 0) status = 'falling'
        else if (Math.trunc(this.speedY) < 0) status = 'rising'
        else if (collision === 'bottom') status = 'OnGround'

        return { collision, status }
    }

    checkVerticalCollision(nextPosition) {
        const maxY = this.container.height - this.height
        if (nextPosition >= this.container.height - this.height) return { collision: 'bottom', y: maxY }
        if (nextPosition <= 0) return { collision: 'top', y: 0 }

        for (const plataform of this.plataforms) {
            if ((this.height + nextPosition > plataform.y && nextPosition < plataform.y + plataform.height) &&
                plataform.x < this.x + this.width + this.speedX &&
                plataform.x + plataform.width > this.x &&
                this.x + this.speedX < plataform.x + plataform.width &&
                this.x + this.width > plataform.x)
                return {
                    collision: nextPosition > plataform.y ? 'top' : 'bottom',
                    y: plataform.y - this.height
                }
        }

        return { collision: false }
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
        if (nextPosition > this.container.width - this.width)
            return { collision: true, x: this.container.width - this.width }

        for (const plataform of this.plataforms) {
            if (!(this.y + this.height > plataform.y && this.y < plataform.y + plataform.height)) continue

            if (nextPosition > plataform.x - this.width && nextPosition < plataform.x + plataform.width) {
                if (direction == 'left') return { collision: true, x: plataform.x + plataform.width }
                return { collision: true, x: plataform.x - this.width }

            }
        }

        return { collision: false }
    }
}
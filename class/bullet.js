class Bullet extends Entity {
    constructor(x, y, direction, container) {
        super(x, y, 15, 3, container, [])
        super.createEntity(container.element, '#fff')
        this.speed = 5
        this.action(direction, true)
    }

    action(direction, first) {
        const { collision } = super.checkHorizontalCollision(direction, this.speed)

        if (collision) {
            this.destroy()
            return
        }

        else this.x += direction == 'right' ? this.speed : -this.speed
        if (first && direction == 'right') this.x += 40
        this.element.style.left = `${this.x}px`

        requestAnimationFrame(() => this.action(direction))
    }

    destroy() {
        this.element.remove()
        for (let prop in this) {
            if (this.hasOwnProperty(prop)) {
                delete this[prop]
            }
        }
    }
}
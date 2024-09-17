class Bullet extends Entity {
    constructor(x, y, direction, container, enemies, platforms) {
        super(x, y, 15, 3, container, platforms)
        super.createEntity(container.element, '#fff')
        this.speed = 10
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
        Object.keys(this).forEach(prop => delete this[prop]);
    }
}
class Enemy extends Entity {
    constructor(x, y, size, container, plataforms) {
        super(x, y, 60, container, plataforms)
        this.direction = 'right'

        super.createEntity(container.element)
        this.setSkin()
        this.start()
    }

    setSkin(i = 0) {
        const frame = stopSkull[i]

        super.setSkin(frame)

        setTimeout(() => { this.setSkin(i == 0 ? 1 : 0) }, i == 0 ? 1500 : 750);
    }

    walk() {
        const collision = super.walk(this.direction, 2)
        if (collision == true) this.direction = this.direction == 'left' ? 'right' : 'left'
    }

    start() {
        this.walk(this.direction)
        super.gravity()
        requestAnimationFrame(() => this.start())
    }
}
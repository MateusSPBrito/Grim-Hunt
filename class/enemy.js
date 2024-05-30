class Enemy extends Entity {
    constructor(x, y, size, container, plataforms) {
        super(x, y, 60, container, plataforms)
        this.y = 400 - size - y;
        this.speed = 0
        this.plataforms = plataforms

        super.createEntity(container)
        this.setSkin(container)

        this.walk()
    }

    setSkin(container, i = 0) {
        const frame = stopSkull[i]

        super.setSkin(frame)

        setTimeout(() => { this.setSkin(container, i == 0 ? 1 : 0) }, i == 0 ? 1500 : 750);
    }

    walk(direction = 'right') {
        const collision = super.walk(direction, 2)
        if (collision == true) direction = direction == 'left' ? 'right' : 'left'
        requestAnimationFrame(() => {this.walk(direction); super.applyGravity()})
    }

    // walk() {
    //     if (this.speed == 0) this.speed = 1
    //     while (1) {
    //         const checkCollision = this.checkCollision()

    //         if (!checkCollision) break

    //         this.speed *= -1
    //     }

    //     super.setX(super.getPosition().x + this.speed)

    //     requestAnimationFrame(() => this.walk())
    // }

    // checkCollision(start = false) {
    //     if (super.getPosition().x + this.speed < 0 || super.getPosition().x + this.speed > 800 - this.width) return true
    //     for (const plataform of this.plataforms) {

    //         if (
    //             !start &&
    //             this.y + this.height == plataform.y &&
    //             (super.getPosition().x + this.speed < plataform.x || super.getPosition().x + this.width + this.speed > plataform.x + plataform.width)
    //         ) return true

    //         if (this.y + this.height > plataform.y && this.y < plataform.y + plataform.height) {
    //             if (
    //                 (this.speed > 0 && plataform.x < super.getPosition().x + this.width + this.speed && plataform.x + plataform.width > super.getPosition().x) ||
    //                 (this.speed < 0 && super.getPosition().x + this.speed < plataform.x + plataform.width && super.getPosition().x + this.width > plataform.x)
    //             ) return true
    //         }
    //     }
    // }
}
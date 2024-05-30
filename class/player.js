class Player extends Entity {
    constructor(container, plataforms) {
        super(350, 350, 50, container)
        this.x = 350;
        this.y = 350;
        this.speed = 0;
        this.jumpSpeed = 0;
        this.jumpsRemaining = 2;
        this.actions = { left: false, right: false, jump: false };
        this.element
        this.width = 50
        this.height = 50
        this.plataforms = plataforms

        super.createEntity(container)
        this.createListener()
        this.setSkin()
    }

    createListener() {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {

                case 'ArrowUp':
                    if (this.jumpsRemaining > 0) {
                        this.jumpsRemaining--
                        this.actions.jump = true
                        this.jumpSpeed = -5
                        this.setSkin()
                    }
                    break;

                case 'ArrowLeft':
                    if (this.actions.left) break
                    this.actions.left = true
                    this.setSkin()
                    break;

                case 'ArrowRight':
                    if (this.actions.right) break
                    this.actions.right = true
                    this.setSkin()
                    break;
            }
        });

        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    this.actions.left = false
                    this.setSkin()
                    break
                case 'ArrowRight':
                    this.actions.right = false
                    this.setSkin()
                    break
            }
        });

        this.commands()
    }

    setSkin(i = 0, oldAction = null) {

        const { frame, action } = this.getAppearanceFrameAndAction(i)
        if (!(frame && action) || (oldAction && oldAction !== action)) return

        super.setSkin(frame)

        if (action == 'right' || action == 'left') setTimeout(() => { this.setSkin(i == 0 ? 1 : 0, action) }, 200);
    }

    getAppearanceFrameAndAction(i) {
        let frame
        let action

        if (this.actions.jump) {
            action = 'jump'

            if (this.jumpSpeed < 0) {
                if (this.actions.left && !this.actions.right) frame = riseLeft
                else if (!this.actions.left && this.actions.right) frame = riseRight
                else frame = rise
            }
            else {
                if (this.actions.left && !this.actions.right) frame = dropLeft
                else if (!this.actions.left && this.actions.right) frame = dropRight
                else frame = drop
            }
        }

        else if (this.actions.left === this.actions.right) {
            action = 'stop'
            frame = stopped
        }
        else {
            action = this.actions.left ? 'left' : 'right'
            frame = this.actions.left ? walkLeft[i] : walkRight[i]
        }
        return { frame, action }
    }

    walk() {
        this.speed = 0
        if (this.actions.left && !this.actions.right) this.speed = -3;
        else if (this.actions.right && !this.actions.left) this.speed = 3;

        while (1) {
            const command = this.speed < 0 ? 'left' : this.speed > 0 ? 'right' : null
            const checkCollision = command === null ? false : this.checkCollision(command)

            if (!checkCollision) break

            if (this.speed < 0) this.speed += 1
            else if (this.speed > 0) this.speed -= 1
            else break
        }

        this.x += this.speed;
        this.element.style.left = `${this.x}px`
    }

    jump() {
        const checkCollision = this.checkCollision()
        const oldJumpSpeed = this.jumpSpeed

        if (!checkCollision) {
            this.y += this.jumpSpeed
            this.jumpSpeed += 0.2
            this.element.style.top = `${this.y}px`
        }

        else if (this.jumpSpeed > 0) { //caindo
            this.y = checkCollision.y - this.height
            this.jumpSpeed = 0
            this.actions.jump = false
            this.jumpsRemaining = 2
            this.element.style.top = `${this.y}px`
        }
        else if (this.jumpSpeed < 0) { // subindo
            this.jumpSpeed = 0
            this.y = checkCollision.y + checkCollision.height
            this.element.style.top = `${this.y}px`
        }

        if (oldJumpSpeed < 0 && this.jumpSpeed >= 0) this.setSkin()
        else if (oldJumpSpeed > 0 && this.jumpSpeed === 0 && oldJumpSpeed - this.jumpSpeed > 0.5)
            this.setSkin()

    }

    checkCollision(command = 'jump') {
        if (command != 'jump' && (this.x + this.speed < 0 || this.x + this.speed > 800 - this.width)) return true

        if (command == 'jump' && this.y + this.jumpSpeed >= 350) return { height: 0, y: 400 }

        for (const plataform of this.plataforms) {
            if (command != 'jump' &&
                (this.y + this.height > plataform.y && this.y < plataform.y + plataform.height)
            ) {
                if (command == 'right' && plataform.x < this.x + this.width + this.speed &&
                    plataform.x + plataform.width > this.x) return true

                if (command == 'left' && this.x + this.speed < plataform.x + plataform.width &&
                    this.x + this.width > plataform.x) return true
            }
            else if (command == 'jump' &&
                (this.y + this.height + this.jumpSpeed > plataform.y && this.y + this.jumpSpeed < plataform.y + plataform.height) &&
                plataform.x < this.x + this.width + this.speed &&
                plataform.x + plataform.width > this.x &&
                this.x + this.speed < plataform.x + plataform.width &&
                this.x + this.width > plataform.x
            ) return { height: plataform.height, y: plataform.y }
        }

        return false
    }

    commands() {
        this.walk()
        this.jump()
        requestAnimationFrame(() => this.commands())
    }
}
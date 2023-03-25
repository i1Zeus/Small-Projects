const getLength = (x0, y0, x1, y1) => {
    const x = x1 - x0;
    const y = y1 - y0;
    return Math.sqrt(x * x + y * y);
};

const getAngle = (x0, y0, x1, y1) => {
    const x = x1 - x0;
    const y = y1 - y0;
    return Math.atan2(y, x);
};

const DECAY = 4;
const SPREAD = 60;
const GRAVITY = 1200;

export class ConfettiCanon {
    constructor() {
        // set up the canvas
        this.canvas = document.createElement("canvas");
        this.dpr = window.devicePixelRatio || 1;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.scale(this.dpr, this.dpr);

        // add confetti
        this.confettiSpriteIds = [];
        this.confettiSprite = { angle: 0 };

        // vector line representing the firing angle
        this.drawVector = false;
        this.vector = [
            { x: window.innerWidth, y: window.innerHeight * 1.25 },
            { x: window.innerWidth, y: window.innerHeight * 2 },
        ];
        this.pointer = {};

        // bind methods
        this.render = this.render.bind(this);
        this.handelMousedown = this.handelMousedown.bind(this);
        this.handelMouseup = this.handelMouseup.bind(this);
        this.handelMousemove = this.handelMousemove.bind(this);
        this.handelTouchstart = this.handelTouchstart.bind(this);
        this.handelTouchmove = this.handelTouchmove.bind(this);
        this.setCanvasSize = this.setCanvasSize.bind(this);
        this.setListeners = this.setListeners.bind(this);
        this.setCanvasSize();
        this.timer = setTimeout(this.handelMouseup, 1000);
    }

    setListeners() {
        // use tweenLite tick event for the render loop
        TweenLite.ticker.addEventListener("tick", this.render);

        // listen for resize events
        window.addEventListener("resize", this.setCanvasSize);

        // listen for pointer down
        this.canvas.addEventListener("mousedown", this.handelMousedown);
        this.canvas.addEventListener("touchstart", this.handelTouchstart);

        // listen for pointer up
        this.canvas.addEventListener("mouseup", this.handelMouseup);
        this.canvas.addEventListener("touchend", this.handelMouseup);

        // listen for pointer move
        this.canvas.addEventListener("mousemove", this.handelMousemove);
        this.canvas.addEventListener("touchmove", this.handelTouchmove);
    }

    setCanvasSize() {
        this.canvas.width = window.innerWidth * this.dpr;
        this.canvas.height = window.innerHeight * this.dpr;
        this.canvas.style.width = window.innerWidth + "px";
        this.canvas.style.height = window.innerHeight + "px";
        // this.ctx.scale(this.dpr, this.dpr);
    }

    handelMousedown(e) {
        clearTimeout(this.timer);
        this.pointer.x = e.clientX * this.dpr;
        this.pointer.y = e.clientY * this.d;
        //* Add the confetti sprites to the array of sprites
        this.confettiSpriteIds.push(confetti.id);
        this.confettiSprite[confetti.id] = confetti;
        return confetti.id;
    }
    // return null;

    updateConfettiSprite(id, dt) {
        const sprite = this.confettiSprite[id];
        if (!sprite) return;
        const progress = Math.min(1, sprite.time / sprite.duration);
        const decay = 1 - Math.pow(progress, DECAY);
        sprite.velocity.y += GRAVITY * dt;
        sprite.x += sprite.velocity.x * dt;
        sprite.y += sprite.velocity.y * dt;
        sprite.rotation += sprite.angularVelocity * dt;
        sprite.scale = Math.max(0, sprite.scale - decay * dt * 2);
        sprite.time += dt;
        if (progress === 1 || sprite.scale === 0) {
            this.removeConfettiSprite(id);
        }
    }

    removeConfettiSprite(id) {
        const index = this.confettiSpriteIds.indexOf(id);
        if (index !== -1) {
            this.confettiSpriteIds.splice(index, 1);
        }
        delete this.confettiSprite[id];
    }

    render() {
        //? clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //? draw the vector line
        if (this.drawVector) {
            this.drawVectorLine();
        }

        //? draw confetti
        for (const id of this.confettiSpriteIds) {
            const sprite = this.confettiSprite[id];
            this.ctx.save();
            this.ctx.translate(sprite.x, sprite.y);
            this.ctx.rotate(sprite.rotation);
            this.ctx.scale(sprite.scale, sprite.scale);
            this.ctx.fillStyle = sprite.color;
            this.ctx.fillRect(
                -sprite.width / 2,
                -sprite.height / 2,
                sprite.width,
                sprite.height
            );
            this.ctx.restore();
            this.updateConfettiSprite(id, 1 / 60);
        }
    }

    render() {
        //? clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //? render confetti
        for (let i = 0; i < this.confettiSpriteIds.length; i++) {
            const sprite = this.confettiSprite[this.confettiSpriteIds[i]];
            sprite.velocity.y += GRAVITY / 1000;
            sprite.x += sprite.velocity.x / 1000;
            sprite.y += sprite.velocity.y / 1000;

            //* handle decay
            sprite.rotation += sprite.rotationVelocity / 1000;
            sprite.scale -= DECAY / 1000;
            if (sprite.scale <= 0) {
                delete this.confettiSprite[this.confettiSpriteIds[i]];
                this.confettiSpriteIds.splice(i, 1);
                i--;
                continue;
            }

            //* render sprite
            this.ctx.save();
            this.ctx.translate(sprite.x, sprite.y);
            this.ctx.rotate(sprite.rotation);
            this.ctx.scale(sprite.scale, sprite.scale);
            this.ctx.fillStyle = sprite.color;
            this.ctx.fillRect(
                -sprite.width / 2,
                -sprite.height / 2,
                sprite.width,
                sprite.height
            );
            this.ctx.restore();
        }

        //? render vector line
        if (this.drawVector) {
            this.drawVectorLine();
        }
    }

    init() {
        //? append the canvas to the body
        document.body.appendChild(this.canvas);

        //? set up event listeners
        this.setListeners();
    }
}
//? Create a new instance of the ConfettiCanon class
const confettiCannon = new ConfettiCanon();
confettiCannon.setListeners();
document.body.appendChild(confettiCannon.canvas);
const confettiCanonInstance = new ConfettiCanon();
confettiCanonInstance.init();

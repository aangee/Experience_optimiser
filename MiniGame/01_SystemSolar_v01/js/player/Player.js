class Player{
    constructor(settings) {
        this.x = settings.x; // pos X
        this.y = settings.y; // pos Y
        this.size = settings.size; // Vec2D
        this.canvas = settings.canvas;
        this.ctx = settings.ctx;

        this.visuelPlayer = new PlayerShap(this.x, this.y, this.size.x, 'lightblue');
       // console.log(this.visuelPlayer);
    }

    loop(){
        this.visuelPlayer.x = this.x;
        this.visuelPlayer.y = this.y;

        this.visuelPlayer.draw(this.ctx);
    }
}
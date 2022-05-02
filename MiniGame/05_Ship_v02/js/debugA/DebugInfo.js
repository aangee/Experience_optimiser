const Alog = {
    initCanvas(settingCanvas) {
        this.canvas = settingCanvas.canvas;
        this.ctx = settingCanvas.ctx;
    }
}


/**
 * 
 */
var DebugInfo = {
    create(ctx, x, y, w, h, isShow) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.variable = [];
        this.variable2 = [];

        this.isShowDebug = isShow;

        //console.log(this.ctx);
    },

    updateVarDebugInfo(variable, variable2) {
        this.variable = variable;
        this.variable2 = variable2;
    },

    drawPanel_D(settings) {
        let offsetDroite = 10;
        let xbis = settings.wCanva - (this.w + offsetDroite);
        let ybis = offsetDroite;
        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgba(255,255,255,1)';
        this.ctx.fillStyle = 'rgba(25,25,25,1)';
        this.ctx.strokeStyle = 'rgba(145,20,80,1)';
        this.ctx.rect(xbis, ybis, this.w, this.h);



        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.font = "10px monospace"
        this.ctx.shadowBlur = 0;
        this.ctx.shadowColor = "rgba(0, 0, 0, 1)";
        this.ctx.shadowOffsetX = 1.5;
        this.ctx.shadowOffsetY = 2;
        this.ctx.fillStyle = 'rgba(255,255,255,1)';
        //this.ctx.strokeStyle = 'rgba(200,20,80,1)';
        //this.ctx.fillText(Math.round(this.variable.txt),this.x+5,this.y+10,this.w)  
        if (this.variable2) {
            for (let i = 0; i < this.variable2.length; i++) {
                const variable = this.variable2[i];
                this.ctx.fillText(variable.label + '' + variable.txt, xbis + 5, ybis + 10 + (i * 10), this.w)
            }
        }
        this.ctx.fill();
        //this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.shadowColor = "rgba(0, 0, 0, 0)";
    },

    drawPanel_G() {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgba(255,255,255,1)';
        this.ctx.fillStyle = 'rgba(25,25,25,1)';
        this.ctx.strokeStyle = 'rgba(145,20,80,1)';
        this.ctx.rect(this.x, this.y, this.w, this.h);



        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.font = "10px monospace"
        this.ctx.shadowBlur = 0;
        this.ctx.shadowColor = "rgba(0, 0, 0, 1)";
        this.ctx.shadowOffsetX = 1.5;
        this.ctx.shadowOffsetY = 2;
        this.ctx.fillStyle = 'rgba(255,255,255,1)';
        //this.ctx.strokeStyle = 'rgba(200,20,80,1)';
        //this.ctx.fillText(Math.round(this.variable.txt),this.x+5,this.y+10,this.w)  
        for (let i = 0; i < this.variable.length; i++) {
            const variable = this.variable[i];
            this.ctx.fillText(variable.label + '' + variable.txt, this.x + 5, this.y + 10 + (i * 10), this.w)
        }
        this.ctx.fill();
        //this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.shadowColor = "rgba(0, 0, 0, 0)";
    },
    drawShape(c, startX, startY, sideLength, sideCountNumerator, sideCountDenominator) {

        // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
        var sideCount = sideCountNumerator * sideCountDenominator;
        var decimalSides = sideCountNumerator / sideCountDenominator;
        var interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
        var interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180; // convert to radians
        c.save();
        c.beginPath();
        c.translate(startX, startY);
        c.moveTo(0, 0);
        for (var i = 0; i < sideCount; i++) {
            c.lineTo(sideLength, 0);
            c.translate(sideLength, 0);
            c.rotate(interiorAngle);
        }
        //c.stroke();
        c.fill();
        c.restore();

    },
}
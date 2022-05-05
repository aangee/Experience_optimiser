class KeyboardInput {

    constructor() {
        document.addEventListener('keydown', (event) => {
            //event.preventDefault();
            //console.log('Key: '+event.key);
            //console.log('Keydown: ' + event.key);
            if(window.app.onKeyDown != null) window.app.onKeyDown(event);
            switch (event.key) {
                case ' '://equivalent a Espace ou SpaceBar
                    //console.log('Espace');
                    app.flowerV0.colorFill = `hsl(${Math.random() * 360}, 50%, 50%)`;
                    break;
                case 'Escape'://equivalent a Echap
                    //console.log('Escape ou Echap');

                    break;
                case 'Shift':
                    //console.log('Shift');
                    break;
                case 'Control':
                    //console.log('Control');
                    break;
                case 'Tab':
                    //console.log('Tab');
                    break;
                case 'CapsLock':
                    //console.log('CapsLock');
                    break;
                case 'z': // up
                
                    break;
                case 's': // down
                
                    break;
                case 'q': // left
                
                    break;
                case 'd': // right

                    break;
                case '²':
                    app.canvas.clear();
                    //console.log('admin');
                    /* settings.menu.btnsMenu.isShowBtnAdmin = !settings.menu.btnsMenu.isShowBtnAdmin;
                    if (!settings.menu.btnsMenu.isShowBtnAdmin)
                        settings.menu.idPageCurrent = 1; */
                    //paddle.moveLeft();
                    break;
                case 'ArrowLeft':
                    //console.log('ArrowLeft');
                    //paddle.moveLeft();
                    
                    app.flowerV0.d += 0.0001;
                    break;
                case 'ArrowRight':
                    //console.log('ArrowRight');
                    //paddle.moveRight();
                    
                    app.flowerV0.d -= 0.0001;
                    break;
                case 'ArrowUp':
                    //console.log('ArrowUp');
                    
                    app.flowerV0.n += 1;
                    //app.flowerV0.n += .00003;
                    break;
                case 'ArrowDown':
                    //console.log('ArrowDown');
                    app.flowerV0.n -= 1;
                    //app.flowerV0.n -= .00003;
                    break;

                default:
                    break;
            }
        });
        document.addEventListener('keyup', (event) => {
            //event.preventDefault();
            ////console.log(event.key);
            //console.log('Keyup: ' + event.key);
            if(window.app.onKeyUp != null) window.app.onKeyUp(event);
            switch (event.key) {
                case ' '://equivalent a Espace ou SpaceBar
                    //console.log('Espace');
                    break;
                case 'Escape'://equivalent a Echap
                    //console.log('Escape ou Echap');
                    break;
                case 'Shift':
                    //console.log('Shift');
                    break;
                case 'Control':
                    //console.log('Control');
                    break;
                case 'Tab':
                    //console.log('Tab');
                    break;
                case 'CapsLock':
                    //console.log('CapsLock');
                    break;
                    case 'z': // up
                    
                    break;
                case 's': // down
                
                    break;
                case 'q': // left
                
                    break;
                case 'd': // right
                
                    break;
                case '§':
                    //console.log('admin');
                    //paddle.moveLeft();

                    //menu.btnsMenu.isShowBtnAdmin = false;
                    break;
                case 'ArrowLeft'://LEFT Gauche
                    //console.log('ArrowLeft'); 
                    /* if (paddle.speed < 0) {
                        paddle.stop();
                    } */
                    break;
                case 'ArrowRight'://RIGHT Droite
                    //console.log('ArrowRight'); 
                    /* if (paddle.speed > 0) {
                        paddle.stop();
                    } */
                    
                    break;
                case 'ArrowUp':
                    //console.log('ArrowUp');
                    break;
                case 'ArrowDown':
                    //console.log('ArrowDown');
                    break;

                default:
                    break;
            }
        });
    }
}
class MouseInput {
    constructor() {

        document.addEventListener('mousedown', (event) => {
            event.preventDefault();
            //console.log('Click '+event.button);
            if(window.app.onMouseDown != null) window.app.onMouseDown(event);
            switch (event.button) {
                case 0:
                    //console.log('Click Gauche');

                    break;
                case 1:
                    //console.log('Click Millieu');
                    //gameMaster.menu.pageScores.addNewLineScore('Test add line');
                    //settings.game.player.isMove = !settings.game.player.isMove;
                    break;
                case 2:
                    //console.log('Click Droit');
                    break;
                case 3:
                    //console.log('Clique bouton 3');
                    break;
                case 4:
                    //console.log('Clique bouton 4');
                    break;

                default:
                    break;
            }
        });
        
        document.addEventListener('mouseup', (event) => {
            event.preventDefault();
            //console.log('Click '+event.button);
            if(window.app.onMouseUp != null) window.app.onMouseUp(event);
            switch (event.button) {
                case 0:
                    //console.log('Click Gauche');
                    
                    break;
                case 1:
                    //console.log('Click Millieu');
                    //gameMaster.menu.pageScores.addNewLineScore('Test add line');
                    //settings.game.player.isMove = !settings.game.player.isMove;
                    break;
                case 2:
                    //console.log('Click Droit');
                    break;
                case 3:
                    //console.log('Clique bouton 3');
                    break;
                case 4:
                    //console.log('Clique bouton 4');
                    break;

                default:
                    break;
            }
        });

        document.addEventListener('contextmenu', (event) => {
            //console.log(event.button);
            //event.preventDefault();

            if(window.app.onMouseContextMenu != null) window.app.onMouseContextMenu(event);
            /* game.ship.aimPoint(mouse.x, mouse.y);
            if (event.shiftKey) {
    
                //game.ship.followPoint(target, 0.01);
    
            } */
        });

        document.body.addEventListener('mousemove', (event) => {
            //console.log(event.button);
            
            if(window.app.onMouseMove != null) window.app.onMouseMove(event);
            /* game.ship.aimPoint(mouse.x, mouse.y);
            if (event.shiftKey) {
    
                //game.ship.followPoint(target, 0.01);
    
            } */
        });
    }
}
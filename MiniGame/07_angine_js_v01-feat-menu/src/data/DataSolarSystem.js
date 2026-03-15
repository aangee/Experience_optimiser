console.log("DataSolar Loader");
class DataSolarSystem {
    constructor() {
        console.log("DataSolar constructor");

        // IMAGE's
        let res = ResourcesLoader;
        let imgPlanet1 = res.findImageByName('saturne01');
        let imgPlanet2 = res.findImageByName('terra00');
        let imgPlanet3 = res.findImageByName('pandora');
        let imgLuna1 = res.findImageByName('luna03');
        let imgLuna2 = res.findImageByName('luna02');


        this.initDataPlanet(imgPlanet1, imgPlanet2, imgPlanet3);
        this.initDataMoon(imgLuna1, imgLuna2);

    }

    initDataPlanet(imgPlanet1, imgPlanet2, imgPlanet3) {
        // Planet 1
        this.planet01Data = {
            position: new Vec2D(200, 200),
            size: new Vec2D(32, 32),//Position du gameObject et taille de image
            //Image et nom de la plante a afficher 
            image: imgPlanet1,
            name: 'Pandora',
            gravity: '1.9',
            //Params pour la rotation sur elle-meme
            rotation: {
                current: 0,//Current rotation sur elle-meme
                speed: 0
            },
            orbite: {//Params pour son orbite
                current: -2,//Current rotation
                dist: 400,//Distance du centre du system
                speed: .001//Vitesse de orbite
            }
        };
        // Planet 2
        this.planet02Data = {
            position: new Vec2D(600, 300),
            size: new Vec2D(32, 32),//Position du gameObject et taille de image
            //Image et nom de la plante a afficher 
            image: imgPlanet2,
            name: 'Terra VI',
            gravity: '0.9',
            //Params pour la rotation sur elle-meme 
            rotation: {
                current: 0,//Current rotation sur elle-meme
                speed: .0035
            },
            orbite: {//Params pour son orbite
                current: -3,//Current rotation
                dist: 850,//Distance du centre du system
                speed: .001//Vitesse de orbite
            }
        };
        // Planet 3
        this.planet03Data = {
            position: new Vec2D(650, 350),
            size: new Vec2D(32, 32),//Position du gameObject et taille de image
            //Image et nom de la plante a afficher 
            image: imgPlanet3,
            name: 'Janus',
            gravity: '10.9',
            //Params pour la rotation sur elle-meme 
            rotation: {
                current: 0,//Current rotation sur elle-meme
                speed: .0017
            },
            orbite: {//Params pour son orbite
                current: .7,//Current rotation
                dist: 1200,//Distance du centre du system
                speed: .001//Vitesse de orbite
            }
        };

    }

    initDataMoon(imgLuna1, imgLuna2) {
        // Moon 1
        this.moonData01 = {
            position: new Vec2D(0, 0),
            size: new Vec2D(10, 10),//Position du gameObject et taille de image
            //Image et nom de la plante a afficher 
            image: imgLuna1,
            name: 'Luna I',
            gravity: '0.5',
            //Params pour la rotation sur elle-meme  
            rotation: {
                current: 0,//Current rotation sur elle-meme
                speed: .01
            },
            orbite: {//Params pour son orbite
                current: 0,//Current rotation
                dist: 50,//Distance du centre du system
                speed: .0017//Vitesse de orbite
            }
        };
        //Moon 2
        this.moonData02 = {
            position: new Vec2D(0, 0),
            size: new Vec2D(10, 10),//Position du gameObject et taille de image
            //Image et nom de la plante a afficher 
            image: imgLuna2,
            name: 'Luna II',
            gravity: '0.7',
            //Params pour la rotation sur elle-meme 
            rotation: {
                current: 0,//Current rotation sur elle-meme
                speed: .01
            },
            orbite: {//Params pour son orbite
                current: 0.3,//Current rotation
                dist: 30,//Distance du centre du system
                speed: .001//Vitesse de orbite
            }
        };
        //Moon 3
        this.moonData03 = {
            position: new Vec2D(0, 0),
            size: new Vec2D(10, 10),//Position du gameObject et taille de image
            //Image et nom de la plante a afficher 
            image: imgLuna1,
            name: 'Luna isat',
            gravity: '1',
            //Params pour la rotation sur elle-meme 
            rotation: {
                current: 0,//Current rotation sur elle-meme
                speed: .01
            },
            orbite: {//Params pour son orbite
                current: 0.3,//Current rotation
                dist: 50,//Distance du centre du system
                speed: .001//Vitesse de orbite
            }
        };
    }
}

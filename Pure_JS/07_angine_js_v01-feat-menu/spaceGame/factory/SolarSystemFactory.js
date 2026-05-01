class SolarSystemFactory extends Factory {
    constructor() {
        super();
        this.data = new DataSolarSystem();
    }


    createPlanet(pos, size, params) {
        let go = new Planet(pos, size, params);
        go.addComponent(new PlanetRender(go, params.image));
        go.addComponent(new BitmapCollider(go, Service.ramdomUColor()));

        this.listGO.push(go);

        return go;

    }
    createSolarSystem(image, pos, size, params) {
        let go = new SolarSystem(pos, size, params);
        // Renderer's
        go.addComponent(new SolarSystemRenderer(go, image));

        //#region ASTRE's
        // Planet 1
        let p1Data = this.data.planet01Data;
        let p1 = this.createPlanet(
            //Position du gameObject et taille de image
            p1Data.position, p1Data.size,
            {//Image et nom de la plante a afficher 
                image: p1Data.image,
                name: p1Data.name,
                gravity: p1Data.gravity,
                //Params pour la rotation sur elle-meme
                rotation: p1Data.rotation,
                orbite: p1Data.orbite
            });
        // Planet 2
        let p2Data = this.data.planet02Data;
        let p2 = this.createPlanet(
            //Position du gameObject et taille de image
            p2Data.position, p2Data.size,
            {//Image et nom de la plante a afficher 
                image: p2Data.image,
                name: p2Data.name,
                gravity: p2Data.gravity,
                //Params pour la rotation sur elle-meme
                rotation: p2Data.rotation,
                orbite: p2Data.orbite
            });
        // Planet 3
        let p3Data = this.data.planet03Data;
        let p3 = this.createPlanet(
            //Position du gameObject et taille de image
            p3Data.position, p3Data.size,
            {//Image et nom de la plante a afficher 
                image: p3Data.image,
                name: p3Data.name,
                gravity: p3Data.gravity,
                //Params pour la rotation sur elle-meme
                rotation: p3Data.rotation,
                orbite: p3Data.orbite
            });
        // Moon 1
        let l1Data = this.data.moonData01;
        let l1 = this.createPlanet(
            //Position du gameObject et taille de image
            l1Data.position, l1Data.size,
            {//Image et nom de la plante a afficher 
                image: l1Data.image,
                name: l1Data.name,
                gravity: l1Data.gravity,
                //Params pour la rotation sur elle-meme
                rotation: l1Data.rotation,
                orbite: l1Data.orbite,
                gravity: l1Data.gravity
            });
        //Moon 2
        let l2Data = this.data.moonData02;
        let l2 = this.createPlanet(
            //Position du gameObject et taille de image
            l2Data.position, l2Data.size,
            {//Image et nom de la plante a afficher 
                image: l2Data.image,
                name: l2Data.name,
                gravity: l2Data.gravity,
                //Params pour la rotation sur elle-meme
                rotation: l2Data.rotation,
                orbite: l2Data.orbite
            });
        //Moon 3
        let l3Data = this.data.moonData03;
        let l3 = this.createPlanet(
            //Position du gameObject et taille de image
            l3Data.position, l3Data.size,
            {//Image et nom de la plante a afficher 
                image: l3Data.image,
                name: l3Data.name,
                gravity: l3Data.gravity,
                //Params pour la rotation sur elle-meme
                rotation: l3Data.rotation,
                orbite: l3Data.orbite
            });
        //#endregion

        // Configuration du system

        //On set la current planet pour eviter un "if(currentPlanet === null) blabla..."
        go.currentSeletedPlanet = p1;
        // Ajout des lune a nos planets
        p1.addMoon(l2);
        p1.addMoon(l1);
        p2.addMoon(l3);
        // Ajout des planets au system
        go.addPlanet(p1);
        go.addPlanet(p2);
        go.addPlanet(p3);

        // Ajout a la liste de nos gameObject
        this.listGO.push(go);

        return go;

    }
}
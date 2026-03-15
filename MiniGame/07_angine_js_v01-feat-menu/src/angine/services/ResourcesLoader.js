
console.log("ResourceLoader bien charger");
/**
 * Permet de charger des assets 'image, audio'
 * pour les utilises plus simplement dans app.
 * @WARN se lance un foi, au lancement de l'app
 */
class ResourcesLoader {
    /**@type {HTMLImageElement[]} @param listResourceImage list de toutes nos images (HTMLImageElement)*/
    static listResourceImage = [];

    /**@type {HTMLAudioElement[]} @param listResourceAudio list de toutes nos audio (HTMLAudioElement)*/
    static listResourceAudio = [];
    constructor() {
        /**@type {Number} */
        this.nbsImg = 0;
        /**@type {Number} */
        this.nbsAudio = 0;
        /**@type {Number} */
        this.totalResource = 0;
    }
    /** Calcule le nbs asset total a charger
     * @param {Number} nI nbs image
     * @param {Number} nA nbs audio
     */
    preCalculTotalAssets(nI, nA) {
        this.nbsImg = nI;
        this.nbsAudio = nA;
        this.totalResource = nI + nA;
    }
    /**Decrement le totalResource */
    decresTotal() {
        this.totalResource--;
        if (this.totalResource === 0) {
            console.info('Assets ready ;)');
            console.debug('Assets non charger: ' + this.totalResource);
            //On lance le callback
            this.callbackReady();
        }
    }
    /** Charger toutes les resources de app 
     * @param {Object} listNameImg nom des tous les image de notre app
     * @param {Object} listNameAudio nom des tous les audio de notre app
     * @param {Function} callback function a appler apres le chargement des assets
     */
    static loadAllResources({ listNameImg, listNameAudio }, callback) {
        let nbsImg = listNameImg.length;
        let nbsAudio = listNameAudio.length;
        let t = nbsImg + nbsAudio;
        console.debug('Assets a charger: ', t);
        // On set notre callback pour appeller une foi les assets charger
        this.prototype.callbackReady = callback;
        // On addition le tous
        this.prototype.preCalculTotalAssets(nbsImg, nbsAudio);

        //Charger toutes les image et les audio
        ResourcesLoader.loadAllImages(listNameImg);
        ResourcesLoader.loadAllAudio(listNameAudio);
    }
    /** @returns le nbs total d'assets a charger*/
    static getTotalAssets() {
        return this.prototype.totalResource;
    }

    static loadAllImages(listNameImg) {
        if (listNameImg.length) {
            for (let i = 0; i < listNameImg.length; i++) {
                const imgName = listNameImg[i];
                //On cree une image
                let tmpImgHtml = new Image();
                //On set la source
                tmpImgHtml.src = `./src/spaceGame/resources/${imgName}.png`;
                //On diminue de 1 le 'totalResource' une foi image charge
                tmpImgHtml.onload = _ => { this.prototype.decresTotal(); };

                //On cree un object anonyme pour ajoute a la 'listResourceImage'
                let imgPlusLabel = {
                    /**@type {string} @param label nom de notre image */
                    label: imgName,
                    /**@type {HTMLImageElement} @param imgHtml notre imageHtml */
                    imgHtml: tmpImgHtml
                };
                //Ajout a la 'listResourceImage' 
                this.listResourceImage.push(imgPlusLabel);
            }

        }
    }
    static loadAllAudio(listNameAudio) {
        if (listNameAudio.length) {
            for (let i = 0; i < listNameAudio.length; i++) {
                //TODO: Pas audio pour l'instant
                this.prototype.decresTotal();
                //this.prototype.totalResource--;

                const audioName = listNameAudio[i];
                let tmpAudioHtml = new Audio();
                //tmpAudioHtml.src = `./src/spaceGame/resources/${audioName}.mp3`;
                let audioPlusLabel = {
                    label: audioName,
                    imgHtml: tmpAudioHtml
                };

                this.listResourceImage.push(audioPlusLabel);
            }

        }
    }
    /** Cherche une image par son nom ! "img deja charge" !
     * @param {string} nameImg nom de image sans (.png, .jpeg, ect...)
     * @returns [HTMLImageElement] || [null] si pas image trouver*/
    static findImageByName(nameImg) {
        for (let i = 0; i < this.listResourceImage.length; i++) {
            const imgPlusName = this.listResourceImage[i];
            //On check si image exist via son nom dans label
            if (imgPlusName.label === nameImg) {
                return imgPlusName.imgHtml
            }
        }
        console.log('Resource non trouver dans les resource pre charger');
        return null;
    }
}
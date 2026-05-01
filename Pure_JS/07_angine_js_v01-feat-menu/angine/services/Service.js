class Service{

    //static DEFAULT = DefaultService;

    /**@type {MapService} ref de MapService*/
    static MAP = new MapService();

    /**@type {CameraService} ref de  CameraService*/
    static CAMERA = new CameraService();
     
    /**@type {BroadcastService} ref de  BroadcastService*/
    static BROADCAST = new BroadcastService();

    /**@type {HitService} ref de  HitService*/
    static HIT = new HitService();

    // Scale pour la map
    static scaleF = 2;

    constructor() { }

    //#region All canvas
    static clearAllCanvas() {
        //on fill le canvas map ( pour cree un fake background)
        Service.MAP.backgroundCanvas('rgb(30,30,30)');
        //on clear le canvas camera
        Service.CAMERA.clearCanvas(false);
        //on clear le canvas broadcast
        Service.BROADCAST.clearCanvas(false);
        //on clear le canvas hit
        Service.HIT.clearCanvas(true);
    }
     
    /**Reglage des tailles des canvas*/
    static setAllSizeCanvas(size){
        Service.MAP.setSize(size);// Map
        Service.CAMERA.setSize(size);// Camera
        Service.BROADCAST.setSize(size);// Broadcast
        Service.HIT.setSize(size);// Hit
    }
    //#endregion

    //#region Camera
    /**  @param {Player} go ref du player */
    static initCameraScaleTranslate(go) {
        // Nos canvas et context utile pour plus bas ↡ ↡ ↡
        let cnv_c = Service.CAMERA.cnv;//Camera
        let cnv_m = Service.MAP.cnv;//Map
        let ctx_m = Service.MAP.ctx;//Map
        let ctx_h = Service.HIT.ctx;//Hit

        // Positionne le player"ship" au centre du canvas camera
        go.transform.position.x = cnv_c.width / 2;
        go.transform.position.y = cnv_c.height / 2;

        /* Pre calcule du translate: */
        // Calcule taille map
        let w_MapDiv2 = Service.MAP.getMapSize() / 2;//cnv_m.width/2;
        let h_MapDiv2 = Service.MAP.getMapSize() / 2;//cnv_m.height/2;
        // Calcule taille camera
        let w_CamDiv2 = cnv_c.width / 2;
        let h_CamDiv2 = cnv_c.height / 2;
        // Calcule du translate
        let w_calT = -((w_MapDiv2 * this.scaleF) - w_CamDiv2);
        let h_calT = -((h_MapDiv2 * this.scaleF) - h_CamDiv2);

        // Positionnement de la map au centre de la camera
        ctx_m.translate(w_calT, h_calT);
        //idem pour le canvas de hit(detection collision)
        ctx_h.translate(w_calT, h_calT);

        // Scale canvas map
        ctx_m.scale(this.scaleF, this.scaleF);
        //idem canvas hit
        ctx_h.scale(this.scaleF, this.scaleF);
    }
    //#endregion


    static ramdomUColor() {
        return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;
    }

}
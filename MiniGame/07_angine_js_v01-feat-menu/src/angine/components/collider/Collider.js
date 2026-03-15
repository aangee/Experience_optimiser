class Collider extends Component{
    /** Gere les collision entre les gameObject
     * @param {GameObject} go gameObject */
    constructor(go) {
        super(go);
        let {position,size} = go.transform;
        this.pos = position;
        this.size = size;

        /**@type {HitService} */
        this.cnvService = Service.HIT;// CnvService.DEFAULT;
        //Active ou desactive le collider
        this.isActive = false;

        //Info sur la collision
        this.isColliding = false;
    }

    start() { }
    init() { }
    update() { }
}
function CreateObject(params = {}) {
    let { nameObject, position, size } = params;

    this.nameObject = nameObject || 'default name';
    this.position = position || { x: 0, y: 0 };
    this.size = size || { x: 0, y: 0 };

    this.velocity = { x: 1, y: 0 }

    this.update = () => {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    this.setVelocity = (vec2) => {
        let { x, y } = vec2;
        this.velocity.x = x;
        this.velocity.y = y;

    }
}


const objFunction = new CreateObject({ nameObject: 'HOHO un obj !!', position: { y: 0 } });
const obj2Function = new CreateObject();


console.debug(objFunction);
console.debug(obj2Function); 
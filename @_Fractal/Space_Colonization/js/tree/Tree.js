class Tree {

    constructor() {
        this.leaves = [];
        this.branches = [];

        //Feullies
        for (let i = 0; i < 300; i++) {
            this.leaves.push(new Leaf());
        }
        let pos = new Vec2D(sizeCanvas.w / 2, sizeCanvas.h);
        let dir = new Vec2D(0, -1);
        let root = new Branch(null, pos, dir);
        this.branches.push(root);
        let current = root;
        let found = false;
        while (!found) {
            for (let i = 0; i < this.leaves.length; i++) {
                let leaf = this.leaves[i];
                let d = root.pos.distTo(leaf.pos);

                if (d < max_dist) {
                    found = true;
                }

                if (!found) {
                    let branch = current.next();
                    current = branch;
                    this.branches.push(current);
                }
            }
        }
    }

    grow() {
        for (let l = 0; l < this.leaves.length; l++) {
            let leaf = this.leaves[l];

            let closestBranch = null;
            let record = 100000;
            for (let b = 0; b < this.branches.length; b++) {
                let branch = this.branches[b];
                let d = leaf.pos.distTo(branch.pos);

                if (d < min_dist) {
                    leaf.reached = true;
                    closestBranch = null;
                    break;
                } else if (d > max_dist) {
                    //break;
                    //continue;
                } else if (closestBranch == null || d < record) {
                    closestBranch = branch;
                    record = d;
                }
            }
            if (closestBranch != null) {
                let newDir = leaf.pos.subtract(closestBranch.pos);
                newDir.normalize();
                closestBranch.dir.addTo(newDir);
                closestBranch.count++;
            }
        }

        for (let l = this.leaves.length - 1; l >= 0; l--) {
            if (this.leaves[l].reached) {
                this.leaves.splice(l, 1);
            }
        }

        for (let b = this.branches.length - 1; b >= 0; b--) {
            let branch = this.branches[b];
            if (branch.count > 0) {
                branch.dir.divideBy(branch.count + 1);
                this.branches.push(branch.next());
            }
            branch.reset();
        }
    }

    show(ctx) {
        for (let l = 0; l < this.leaves.length; l++) {
            this.leaves[l].show(ctx);
        }
        for (let b = 0; b < this.branches.length; b++) {
            this.branches[b].show(ctx);
        }
    }
}
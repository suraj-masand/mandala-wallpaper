class Flower {
    
    constructor(id, radii, lineColor, thickness) {
        this.id = id;
        this.vertices = this.getVertices(radii)
        this.lineColor = lineColor;
        this.thickness = thickness;
    }

    getVertices(radii) {
        let incrementalAngle = -360 / radii.length; // direction controlled by negative or positive
        let vertices = []
        for (let i = 0; i < radii.length; i += 1) {
            let r = radii[i];
            let x = r * cos(i * incrementalAngle);
            let y = r * sin(i * incrementalAngle);
            vertices.push([x, y]);
        }
        vertices.push(vertices[0]); // repeat first element at end for closed shape
        return vertices;
    }

    animateFlower(duration) {
        push();
        colorMode(RGB);
        angleMode(DEGREES);
        stroke(this.lineColor);
        strokeWeight(this.thickness);
        animS.shape(this.id, duration, this.vertices);
        pop();
    }
        
    drawFlower() {
        push();
        colorMode(RGB);
        angleMode(DEGREES);
        stroke(this.lineColor);
        strokeWeight(this.thickness);
        beginShape();
        this.vertices.forEach((v) => vertex(...v));
        endShape(CLOSE);
        pop();
    }


}

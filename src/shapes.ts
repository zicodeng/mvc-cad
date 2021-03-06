/****
This module contains class declarations for different Shapes, which can be
shared between the components following OOP design principles.
****/

/**
 * Represents an abstract Shape that can be drawn.
 */
export abstract class DrawableShape {
    abstract color: string;

    /**
     * Set the shape's location on the cartesian grid
     */
    abstract setPosition(x: number, y: number): void;

    /**
     * Return whether the given cartesian coordinate is "inside" the shape
     */
    abstract contains(x: number, y: number): boolean;

    /**
     * Assigns the values of the given object to this shape
     * @param props An object of values to assign, where each key is the property name
     */
    updateProperties(props: { [index: string]: any }) {
        $.extend(this, props); // Use jQuery for easy application
    }

    /**
     * How to draw on a graphical view
     * @param brush The graphics context to draw on
     */
    abstract draw(brush: CanvasRenderingContext2D): void;
    abstract getCopy(): DrawableShape;
}

/**
 * Represets a rectangle
 */
export class Rectangle extends DrawableShape {
    public x: number; // upper corner
    public y: number;

    // cx,cy parameters are the CENTER of the rectangle
    constructor(
        cx: number,
        cy: number,
        public width: number,
        public height: number,
        public color = 'red'
    ) {
        super();
        this.x = cx - width / 2; // Calculate upper corner
        this.y = cy - height / 2;
    }

    contains(x: number, y: number): boolean {
        return (
            x >= this.x &&
            x <= this.x + this.width &&
            y >= this.y &&
            y <= this.y + this.height
        );
    }

    setPosition(x: number, y: number) {
        // Snap to middle
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
    }

    draw(brush: CanvasRenderingContext2D) {
        brush.fillStyle = this.color;
        brush.fillRect(this.x, this.y, this.width, this.height);
    }

    getCopy(): Rectangle {
        return new Rectangle(
            this.x,
            this.y,
            this.width,
            this.height,
            this.color
        );
    }
}

/**
 * Represents a circle
 */
export class Circle extends DrawableShape {
    constructor(
        public cx: number,
        public cy: number,
        public radius: number,
        public color = 'blue'
    ) {
        super();
    }

    contains(x: number, y: number): boolean {
        return (
            Math.sqrt(
                (this.cx - x) * (this.cx - x) + (this.cy - y) * (this.cy - y)
            ) <= this.radius
        );
    }

    setPosition(x: number, y: number) {
        this.cx = x;
        this.cy = y;
    }

    draw(brush: CanvasRenderingContext2D) {
        brush.fillStyle = this.color;
        brush.beginPath();
        brush.arc(this.cx, this.cy, this.radius, 0, 2 * Math.PI);
        brush.fill();
    }

    getCopy(): Circle {
        return new Circle(this.cx, this.cy, this.radius, this.color);
    }
}

/**
 * Represents a triangle
 */
export class Triangle extends DrawableShape {
    // Cach pair of coordinates is a corner of the triangle
    constructor(
        public x1: number,
        public y1: number,
        public x2: number,
        public y2: number,
        public x3: number,
        public y3: number,
        public color = 'green'
    ) {
        super();
    }

    // Calculate centroid of triangle
    private center(): [number, number] {
        return [
            Math.floor((this.x1 + this.x2 + this.x3) / 3),
            Math.floor((this.y1 + this.y2 + this.y3) / 3)
        ];
    }

    // Return area of arbitrary triangle (for calculating containment)
    private static area(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        x3: number,
        y3: number
    ): number {
        return Math.abs(
            (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0
        );
    }

    contains(x: number, y: number): boolean {
        // Calculate containment via Barycentric coordinates
        let A = Triangle.area(
            this.x1,
            this.y1,
            this.x2,
            this.y2,
            this.x3,
            this.y3
        );
        let A1 = Triangle.area(x, y, this.x2, this.y2, this.x3, this.y3);
        let A2 = Triangle.area(this.x1, this.y1, x, y, this.x3, this.y3);
        let A3 = Triangle.area(this.x1, this.y1, this.x2, this.y2, x, y);
        return Math.abs(A - (A1 + A2 + A3)) === 0;
    }

    setPosition(newX: number, newY: number) {
        // Calculate displacement
        let center = this.center();
        let dx = newX - center[0];
        let dy = newY - center[1];

        // Move by displacement
        this.x1 += dx;
        this.x2 += dx;
        this.x3 += dx;
        this.y1 += dy;
        this.y2 += dy;
        this.y3 += dy;
    }

    draw(brush: CanvasRenderingContext2D) {
        brush.fillStyle = this.color;
        brush.beginPath();
        brush.moveTo(this.x1, this.y1);
        brush.lineTo(this.x2, this.y2);
        brush.lineTo(this.x3, this.y3);
        brush.closePath();
        brush.fill();
    }

    getCopy(): Triangle {
        return new Triangle(
            this.x1,
            this.y1,
            this.x2,
            this.y2,
            this.x3,
            this.y3,
            this.color
        );
    }
}

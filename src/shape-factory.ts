import { DrawableShape as Shape, Rectangle, Circle, Triangle } from './shapes';

const baseSize = 60;

interface IShapeFactory {
    createRectangle(
        cx: number,
        cy: number,
        width: number,
        height: number
    ): Shape;

    createCircle(cx: number, cy: number, radius: number): Shape;

    createTriange(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        x3: number,
        y3: number
    ): Shape;
}

class ShapeFactory implements IShapeFactory {
    constructor() {}

    createRectangle(
        cx: number,
        cy: number,
        width: number = baseSize,
        height: number = baseSize * 2
    ): Shape {
        return new Rectangle(cx, cy, width, height);
    }

    createCircle(cx: number, cy: number, radius: number = baseSize): Shape {
        return new Circle(cx, cy, radius);
    }

    createTriange(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        x3: number,
        y3: number
    ): Shape {
        return new Triangle(x1, y1, x2, y2, x3, y3);
    }
}

export default ShapeFactory;

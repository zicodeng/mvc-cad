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
        height: number = baseSize * 2,
        color = 'red'
    ): Shape {
        return new Rectangle(cx, cy, width, height, color);
    }

    createCircle(
        cx: number,
        cy: number,
        radius: number = baseSize,
        color = 'blue'
    ): Shape {
        return new Circle(cx, cy, radius, color);
    }

    createTriange(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        x3: number,
        y3: number,
        color = 'green'
    ): Shape {
        return new Triangle(x1, y1, x2, y2, x3, y3, color);
    }

    recreateShape(parsedShape: Shape): Shape | null {
        // Properties of valid shapes.
        const rectangleProps = Object.keys(this.createRectangle(1, 1, 1, 1))
            .sort()
            .slice(1) // Slice out color because it is optional.
            .toString();
        const circleProps = Object.keys(this.createCircle(1, 1, 1))
            .sort()
            .slice(1)
            .toString();
        const triangleProps = Object.keys(this.createTriange(1, 1, 1, 1, 1, 1))
            .sort()
            .slice(1)
            .toString();

        const props = Object.keys(parsedShape)
            .sort()
            .toString();

        switch (true) {
            case props.includes(rectangleProps):
                const parsedRectangle = parsedShape as Rectangle;
                var { x, y, width, height, color } = parsedRectangle;
                return this.createRectangle(
                    x + width / 2,
                    y + height / 2,
                    width,
                    height,
                    color
                );

            case props.includes(circleProps):
                const parsedCircle = parsedShape as Circle;
                var { cx, cy, radius, color } = parsedCircle;
                return this.createCircle(cx, cy, radius, color);

            case props.includes(triangleProps):
                const parsedTriangle = parsedShape as Triangle;
                var { x1, y1, x2, y2, x3, y3, color } = parsedTriangle;
                return this.createTriange(x1, y1, x2, y2, x3, y3, color);

            default:
                console.error(`Invalid shape: ${JSON.stringify(parsedShape)}`);
                return null;
        }
    }
}

export default ShapeFactory;

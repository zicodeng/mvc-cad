import ShapeFactory from './shape-factory';
import { Model } from './model';

export enum Action {
    RECTANGLE = 'rectangle',
    CIRCLE = 'circle',
    TRIANGLE = 'triangle'
}

class ViewCanvasController {
    private shapeFactory = new ShapeFactory();

    private trianglePoints: number[] = [];

    constructor(private model: Model) {}

    createShape(action: Action, x: number, y: number) {
        switch (action) {
            case Action.RECTANGLE:
                this.model.addShape(this.shapeFactory.createRectangle(x, y));
                break;

            case Action.CIRCLE:
                this.model.addShape(this.shapeFactory.createCircle(x, y));
                break;

            case Action.TRIANGLE:
                this.trianglePoints.push(x);
                this.trianglePoints.push(y);

                if (this.trianglePoints.length === 6) {
                    const x1 = this.trianglePoints[0];
                    const y1 = this.trianglePoints[1];
                    const x2 = this.trianglePoints[2];
                    const y2 = this.trianglePoints[3];
                    const x3 = this.trianglePoints[4];
                    const y3 = this.trianglePoints[5];

                    this.model.addShape(
                        this.shapeFactory.createTriange(x1, y1, x2, y2, x3, y3)
                    );

                    // Clear
                    this.trianglePoints = [];
                }
                break;

            default:
                break;
        }

        // If user decides to draw a different shape,
        // clear triangle points history.
        if (action !== Action.TRIANGLE) {
            this.trianglePoints = [];
        }
    }
}

export default ViewCanvasController;

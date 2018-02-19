import ShapeFactory from './shape-factory';
import { Model } from './model';

export enum Action {
    RECTANGLE = 'rectangle',
    CIRCLE = 'circle',
    TRIANGLE = 'triangle'
}

class ViewCanvasController {
    private shapeFactory = new ShapeFactory();

    constructor(private model: Model) {}

    createShape(action: Action, x: number, y: number) {
        switch (action) {
            case Action.RECTANGLE:
                this.model.addShape(this.shapeFactory.createRectangle(x, y));
                break;

            default:
                break;
        }
    }
}

export default ViewCanvasController;

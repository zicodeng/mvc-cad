import { Model } from './model';
import { DrawableShape, Rectangle, Circle, Triangle } from './shapes';
import ShapeFactory from './shape-factory';

class ViewTextController {
    private shapeFactory = new ShapeFactory();

    constructor(private model: Model) {}

    updateShapes(updatedContent: string) {
        const updatedShapes: DrawableShape[] = [];

        // Remove all when textarea content is empty.
        if (!updatedContent) {
            this.model.updateAll(updatedShapes);
            return;
        }

        let parsedShapes;
        try {
            // Parsed updatedContent is not the same as Shape,
            // because during the process of data serialization (JSON.stringify and JSON.parse),
            // all of the Shape's prototype functions are lost, only properties are preserved.
            parsedShapes = JSON.parse(updatedContent);
            for (const parsedShape of parsedShapes) {
                const updatedShape = this.shapeFactory.recreateShape(
                    parsedShape
                );
                if (!updatedShape) return;
                updatedShapes.push(updatedShape);
            }
            this.model.updateAll(updatedShapes);
        } catch {
            console.error('Fail to parse text representation of shapes');
        }
    }
}

export default ViewTextController;

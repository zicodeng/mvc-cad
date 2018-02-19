import { DrawableShape as Shape, Circle, Rectangle, Triangle } from './shapes';
import { Subject, Observer } from './observer';

/**
 * The CAD drawing model currently being created
 */
export class Model implements Subject {
    private shapes: Shape[] = [];
    private observers: Observer[] = []; // Represent connected views

    constructor() {}

    registerObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    removeObserver(observer: Observer): void {
        this.observers.splice(this.observers.indexOf(observer), 1);
    }

    notifyAll(): void {
        this.observers.forEach(observer => {
            observer.notify();
        });
    }

    getShapes(): Shape[] {
        return this.shapes;
    }

    getShapeAt(x: number, y: number): Shape | null {
        for (let shape of this.shapes) {
            if (shape.contains(x, y)) {
                return shape;
            }
        }
        return null; // Return last shape
    }

    addShape(shape: Shape): void {
        this.shapes.push(shape);
        this.notifyAll();
    }

    updateShape(oldShape: Shape, newShape: Shape): void {
        this.shapes[this.shapes.indexOf(oldShape)] = newShape;
    }

    //TODO: Add more methods...
}

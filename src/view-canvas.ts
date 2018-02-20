import { DrawableShape } from './shapes';
import { Model } from './model';
import ViewCanvasController, { Action } from './view-canvas-controller';
import { Observer } from './observer';

/**
 * A class to represent the View. Contains control buttons and an HTML5 canvas.
 */
class ViewCanvas implements Observer {
    // Constants for easy access.
    readonly canvas = $('#graphics-view canvas')[0] as HTMLCanvasElement;
    readonly brush = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    private selected: DrawableShape | null = null; // Selected state is handled by View.
    private lastClickedShape: DrawableShape | null = null;
    private action: string; // what action we are doing (handled by View).

    private controller = new ViewCanvasController(this.model);

    constructor(private model: Model) {
        // Event listeners (DOM for readability/speed).
        this.canvas.addEventListener('mousedown', e => {
            this.handleMouseDown(e);
        });
        this.canvas.addEventListener('mouseup', e => {
            this.handleMouseUp(e);
        });
        this.canvas.addEventListener('mousemove', e => {
            this.handleMove(e);
        });

        let optionButtons = $('#graphics-view input:radio');
        this.action = optionButtons.val() as string; // Current (initial) selection.
        optionButtons.change(e => {
            this.action = $(e.target).val() as string;
        }); // Update action.

        // Responsive canvas.
        $(window).resize(() => {
            this.resizeCanvas();
        }); // Call function on window resize.
        this.resizeCanvas(); // Initial sizing.
    }

    notify() {
        this.display();
    }

    display() {
        // Erase canvas.
        this.brush.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let shapes: DrawableShape[] = this.model.getShapes();

        // Draw all the shapes!
        for (let shape of shapes) {
            shape.draw(this.brush);
        }
    }

    handleMouseDown(event: MouseEvent) {
        let x = event.offsetX;
        let y = event.offsetY;
        this.selected = this.model.getShapeAt(x, y);

        if (!this.lastClickedShape && this.selected) {
            this.lastClickedShape = this.model.getShapeAt(x, y);
        }

        if (this.action === 'move' && !this.selected && this.lastClickedShape) {
            this.controller.clickMove(this.lastClickedShape, x, y);
            this.lastClickedShape = null;
        } else if (this.action === 'delete' && this.selected) {
            this.controller.removeShape(this.selected);
        } else {
            const action = this.action as Action;
            this.controller.createShape(action, x, y);
        }
    }

    handleMouseUp(event: MouseEvent) {
        this.selected = null;
    }

    handleMove(event: MouseEvent) {
        let x = event.offsetX;
        let y = event.offsetY;

        if (this.selected) {
            this.controller.dragMove(x, y);
            // Disable clickMove if dragMove has been fired.
            this.lastClickedShape = null;
        }
    }

    // Make Canvas responsive (adapted from http://ameijer.nl/2011/08/resizable-html5-canvas/)
    resizeCanvas() {
        const ratio = 1; //4/3;
        let canvasElem = $(this.canvas);
        canvasElem.attr('width', canvasElem.parent().width() as number);
        canvasElem.attr('height', ratio * (canvasElem.width() as number));
        this.display();
    }
}

export default ViewCanvas;

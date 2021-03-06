import { Observer } from './observer';
import { Model } from './model';
import ViewTextController from './view-text-controller';

class ViewText implements Observer {
    private controller = new ViewTextController(this.model);

    private readonly textarea = $('#text-view .form-control');

    constructor(private model: Model) {
        this.model.registerObserver(this);

        const $updateBtn = $('#update-btn');
        $updateBtn.click(e => this.handleShapesUpdate());
        this.textarea.on('input', e => this.handleShapesUpdate());
    }

    notify() {
        this.display();
    }

    private display() {
        const content = this.model.toString();
        this.textarea.val(content);
        this.autosize();
    }

    private handleShapesUpdate() {
        const updatedContent = this.textarea.val() as string;
        this.controller.updateShapes(updatedContent);
    }

    private autosize() {
        const rows = this.model.getShapes().length;
        if (rows > 2) this.textarea.attr('rows', rows);
    }
}

export default ViewText;

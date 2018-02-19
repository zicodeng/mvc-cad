import 'bootstrap'; //bootstrap.js for button toggling

import { Model } from './model';
import { View as CanvasView } from './view-canvas';

const model = new Model();

const canvasView = new CanvasView(model);
model.registerObserver(canvasView);

//TODO: more views and controllers here...

import 'bootstrap'; //bootstrap.js for button toggling

import { Model } from './model';
import ViewCanvas from './view-canvas';

const model = new Model();

const canvasView = new ViewCanvas(model);
model.registerObserver(canvasView);

//TODO: more views and controllers here...

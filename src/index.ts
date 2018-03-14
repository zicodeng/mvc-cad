import 'bootstrap'; //bootstrap.js for button toggling

import { Model } from './model';
import ViewCanvas from './view-canvas';
import ViewText from './view-text';

const model = new Model();
const canvasView = new ViewCanvas(model);
const textView = new ViewText(model);

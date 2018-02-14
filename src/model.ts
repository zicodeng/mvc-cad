import {DrawableShape as Shape, Circle, Rectangle, Triangle} from './shapes';

/**
 * The CAD drawing model currently being created
 */
export class Model {
  private shapes:Shape[] = [];

  constructor() {}

  getShapes():Shape[] {
    return this.shapes;    
  }

  getShapeAt(x:number, y:number):Shape|null{
    for(let shape of this.shapes){
      if(shape.contains(x,y)){
        return shape;
      }
    }
    return null; //return last shape
  }

  //TODO: Add more methods...

}

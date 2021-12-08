import { Action } from './types';

export default function actionCreator<P>(type: string, payload: P = {} as any): Action<P> {
  return { type, payload };
}

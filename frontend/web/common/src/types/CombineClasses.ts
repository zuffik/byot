import {ClassKeyOfStyles, ClassNameMap} from '@material-ui/styles/withStyles';

export type ClassesObject<C> = {classes?: Partial<ClassNameMap<ClassKeyOfStyles<C>>>};

export type CombineClasses<
  T1 extends ClassesObject<C1>,
  T2 extends ClassesObject<C2>,
  C1 = any,
  C2 = any
> = Omit<T1, 'classes'> &
  Omit<T2, 'classes'> & {
    classes?: Partial<T1['classes'] & T2['classes']>;
  };

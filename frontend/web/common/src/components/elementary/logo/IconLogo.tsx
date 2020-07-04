import * as React from 'react';
import {makeStyles, Theme} from '@material-ui/core';
import {Logo} from './Logo';
import {WithStyles} from '../../../types/WithStyles';
import {Rectangle} from '@byot-frontend/common/src/data-manipulation/Rectangle';
import {Constants} from '@byot-frontend/common/src/types/Constants';

interface Props extends WithStyles<typeof styles> {
  height?: number;
}

const styles = (theme: Theme) => ({
  root: (props: Props) => ({
    overflow: 'hidden',
  }),
});
const useStyles = makeStyles(styles);

export const IconLogo: React.FC<Props> = ({height = 100, ...props}: Props) => {
  const styles = useStyles(props);
  // 192x320
  const originalSizeRectangle = new Rectangle(192, 320);
  const wrappingSize = Rectangle.calculateScaled({
    originWidth: originalSizeRectangle.width,
    originHeight: originalSizeRectangle.height,
    targetHeight: height,
  });
  return (
    <div
      className={styles.root}
      style={{
        width: `${wrappingSize.width}px`,
        height: `${wrappingSize.height}px`,
      }}>
      <Logo height={(height * Constants.LOGO_SIZE.height) / originalSizeRectangle.height} />
    </div>
  );
};

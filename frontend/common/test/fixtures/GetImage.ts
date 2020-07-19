export const size = (size: number): {width: number; height: number} => ({width: size, height: size});

export const getImage = ({width = 200, height = 200}: {width?: number; height?: number}): string =>
  `https://picsum.photos/${width}/${height}`;

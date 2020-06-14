const theme = {
  colors: {
    primary: '#00c6ff',
    secondary: '#0072ff',
    light: '#fff',
    dark: 'rgb(56, 56, 56)',
    gradient: {
      middle: '#0097ff',
      contrast: '#FFF',
      start: {
        color: '',
        position: 0,
      },
      end: {
        color: '',
        position: 100,
      },
      angle: 135,
      css: '',
    },
  },
};

// computed
theme.colors.gradient.start.color = theme.colors.primary;
theme.colors.gradient.end.color = theme.colors.secondary;

theme.colors.gradient.css = `linear-gradient(${theme.colors.gradient.angle}deg, ${theme.colors.gradient.start.color} ${theme.colors.gradient.start.position}%, ${theme.colors.gradient.end.color} ${theme.colors.gradient.end.position}%)`;

export default theme;

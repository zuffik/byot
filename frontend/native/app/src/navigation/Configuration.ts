export const linkPrefixes = ['byot://', 'https://byot.online', 'http://byot.local'];

const mapToConfigInner = (
  screens: Record<string, {Name: string; Uri?: () => string} | object>,
  done: Record<string, string> = {}
): Record<string, string> => {
  Object.keys(screens).forEach(k => {
    const screen = screens[k];
    if (!screen.Name) {
      done = mapToConfigInner(screens[k], done);
    } else if (screen.Uri) {
      done[screen.Name] = screen.Uri();
    }
  });
  return done;
};

export const mapToConfig = (screens: Record<string, any>): Record<string, string> =>
  mapToConfigInner(screens);

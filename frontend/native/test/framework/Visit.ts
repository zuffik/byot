export type CreateVisitOptions = {
  prefix: string;
};

/**
 * Source: http://appium.io/docs/en/commands/web/navigation/go-to-url/
 */
export const visit = (prefix: string, url: string) => {
  let full: string;
  if (!url.includes('://')) {
    const u = url.startsWith('/') ? url.slice(1) : url;
    full = prefix + u;
  } else {
    full = url;
  }
  driver.url(full);
};

export const createVisit = ({prefix}: CreateVisitOptions) => (url: string) => visit(prefix, url);

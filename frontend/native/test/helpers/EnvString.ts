// todo this is also copy-paste

export const envString = (value: string, defaultValue?: string | number): string => {
  let val = value;
  let match: RegExpExecArray | null;
  const regex = /{env\.([A-Z_]+)}/g;
  while ((match = regex.exec(value)) != null) {
    val = val.replace(match[0], process.env[match[1]] || defaultValue);
  }
  return val;
};

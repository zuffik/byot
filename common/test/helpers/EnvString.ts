export const envString = (
  value: string,
  defaultValue?: string | number
): string => {
  let val = value;
  const regex = /{env\.([A-Z_]+)}/g;
  let match: RegExpExecArray | null = regex.exec(value);
  while (match != null) {
    const replace = (process.env[match[1]] || defaultValue || '')
      .toString()
      .replace('$', '$$$$');
    val = val.replace(match[0], replace);
    match = regex.exec(value);
  }
  return val;
};

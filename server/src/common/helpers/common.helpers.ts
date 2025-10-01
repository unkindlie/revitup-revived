export const extractErrorNameFromClass = (name: string) =>
  !name.includes('Exception')
    ? name
        .replace('Exception', '')
        .split(/(?=[A-Z])/)
        .join(' ')
    : name;

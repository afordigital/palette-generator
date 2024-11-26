export function ValidateHexadecimal(newColor: string) {
    const regex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

    if (regex.test(newColor)) return true;
    return false;
  }
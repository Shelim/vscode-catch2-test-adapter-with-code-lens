//-----------------------------------------------------------------------------
// vscode-catch2-test-adapter was written by Mate Pek, and is placed in the
// public domain. The author hereby disclaims copyright to this source code.

// eslint-disable-next-line
export function resolveVariables(value: any, varValue: [string, any][]): any {
  if (typeof value == 'string') {
    for (let i = 0; i < varValue.length; ++i) {
      if (value === varValue[i][0] && typeof varValue[i][1] != 'string') {
        return varValue[i][1];
      }
      value = value.replace(varValue[i][0], varValue[i][1]);
    }
    return value;
  } else if (Array.isArray(value)) {
    // eslint-disable-next-line
    return (value as any[]).map((v: any) => resolveVariables(v, varValue));
  } else if (typeof value == 'object') {
    // eslint-disable-next-line
    const newValue: any = {};
    for (const prop in value) {
      newValue[prop] = resolveVariables(value[prop], varValue);
    }
    return newValue;
  }
  return value;
}

let uidCounter = 0;

export function generateUniqueId(): string {
  return (++uidCounter).toString();
}

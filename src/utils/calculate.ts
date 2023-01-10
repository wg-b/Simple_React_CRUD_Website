export const findValueByChar = (_char: string, letterList: any[]): number => {
  if (!letterList) return 0;
  return letterList.find((item: any) => item?.letter === _char)?.val ?? 0;
};

export const calculateSum = (_str: string, letterList: any[]): number => {
  let _ret: number = 0;
  for (const c of _str) {
    _ret += findValueByChar(c, letterList);
  }
  return _ret;
};

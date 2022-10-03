export const uniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const detectMobile = () => {
  /* return  ( window.innerWidth <= 800 ) && ( window.innerHeight <= 600 ) */
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

export const pipe = <R>(...funcs: any[]) => (data: any) => {
  return funcs.reduce((result, func ) => func(result), data) as R
}

type AnyFunction = (...args: any[]) => void;

function debounce(func: AnyFunction, delay: number): AnyFunction {
  let timer: ReturnType<typeof setTimeout>;
  return function(...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

export default debounce;

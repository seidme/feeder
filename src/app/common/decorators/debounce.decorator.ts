function debounceFn(fn: Function, milliseconds = 0, takeFirst = false): Function {
  let timeout;

  return function(): void {
    const ctx = this;
    const args = arguments;

    const callNow = takeFirst && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      timeout = null;

      if (!takeFirst) {
        fn.apply(ctx, args);
      }
    }, milliseconds);

    if (callNow) {
      fn.apply(ctx, args);
    }
  };
}

export function Debounce(milliseconds = 0, takeFirst = false): Function {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    const originalMethod = descriptor.value;
    descriptor.value = debounceFn(originalMethod, milliseconds, takeFirst);
    return descriptor;
  };
}

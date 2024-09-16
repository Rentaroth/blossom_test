function timeExecution(func:any) {
  return (...args:any) => {
    console.time(func.name);
    const result = func.apply(this, args);
    console.timeEnd(func.name);
    return result;
  };
}

export { timeExecution }
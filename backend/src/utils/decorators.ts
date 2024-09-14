import chalk from "chalk";

function timeExecution(func:any) {
  return function (...args:any) {
    console.time(func.name);
    const result = func.apply(this, args);
    console.timeEnd(func.name);
    return result;
  };
}

export { timeExecution }
// @ts-ignore
export const throttle = (func, delay) =>{
    let isTimerSet = false; // private variable for this function, can't be changed from outside
    
    return function() {
      if (!isTimerSet) {
        func.call();
        setTimeout(() => isTimerSet = false, delay)
        isTimerSet = true;
      }
    }
  }
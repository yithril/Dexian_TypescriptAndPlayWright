function double(n: number): number {
  return n * 2;
}

let valueAny: any = "five";
double(valueAny); 
console.log(double(valueAny)); 

let valueUnknown: unknown = "five";
//double(valueUnknown);
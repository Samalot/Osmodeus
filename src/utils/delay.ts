function delay(millis : number) : Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(_ => resolve(0), millis)
  });
}

export default delay;
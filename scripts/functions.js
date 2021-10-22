function timer(t){
  return new Promise(
    (res, rej) => {
      setTimeout(
        () => { res("done") },
        t * 1000
      )
    }
  )
}
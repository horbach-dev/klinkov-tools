export function CommonError(this: any, e: any, s: any) {
  this.error = e
  this.status = s
}

CommonError.prototype = Object.create(Error.prototype)
CommonError.prototype.constructor = CommonError

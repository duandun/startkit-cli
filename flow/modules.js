declare module 'js-cookie' {
  declare var exports: {
    get(key: string): any,
    set(key: string, val: any): any,
    remove(key: string): boolean
  }
}

declare module 'lodash' {
  declare var exports: {
    isEmpty(input: any): boolean
  }
}

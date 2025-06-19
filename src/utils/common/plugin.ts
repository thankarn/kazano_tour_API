export class PluginBase<T> {

  constructor(public plugin: T) { }

  public run<T extends Record<string, any>>(instance: T) {
    const methods = this._getMethodNames(instance);
    methods.forEach((method) => {
      if (
        typeof instance[method] === "function" &&
        method !== "getMethodNames"
      ) {
        try {
          // Call the method dynamically
          instance[method]();
          console.log(`Successfully invoked method: ${method}`);
        } catch (error) {
          console.error(`Error invoking method: ${method}`, error);
        }
      } else {
        console.warn(`Method ${method} does not exist on the instance`);
      }
    });
  }

  private _getMethodNames<T>(plugin: T): string[] {
    // Access the prototype of the class to get the methods
    const prototype = Object.getPrototypeOf(plugin);

    // Get all property names of the prototype, including methods
    const methodNames = Object.getOwnPropertyNames(prototype).filter(
      (prop) =>
        typeof prototype[prop] === "function" && // Only include methods
        prop !== "constructor" // Exclude constructor
    );

    return methodNames;
  }

}

export default class Generator {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
    !this.load() && this.save();
  }

  save<T>(data: T | [] = []): void {
    return localStorage.setItem(this.key, JSON.stringify(data));
  }

  load() {
    return JSON.parse(localStorage.getItem(this.key) as string);
  }

  remove(): void {
    localStorage.removeItem(this.key);
  }
}

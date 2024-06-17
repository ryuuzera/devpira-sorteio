interface IRepository<T> {
  list(options: any): Promise<T[]>;
  get(options: any): Promise<T | null>;
  create(object: Omit<T, 'id'>): Promise<T | null>;
  update(object: T): Promise<boolean>;
  delete(id: number | string): Promise<boolean>;
}

export default IRepository;

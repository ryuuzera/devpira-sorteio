interface IRepository<T> {
  list(): Promise<T[]>;
  get(id: number | string): Promise<T | null>;
  create(object: Omit<T, 'id'>): Promise<T | null>;
  update(object: T): Promise<boolean>;
  delete(id: number | string): Promise<boolean>;
}

export default IRepository;

import { Document, Model, UpdateQuery } from 'mongoose';

export default class Repository<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  public async getAllData(): Promise<T[]> {
    return await this.model.find();
  }

  public async getOneData(id: string): Promise<T | null> {
    return await this.model.findById(id);
  }

  public async createOneData(data: object): Promise<T> {
    const newDocument = await this.model.create(data);
    return newDocument;
  }

  public async updateOneData(
    id: string,
    data: UpdateQuery<T>
  ): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  public async deleteOneData(id: string, active?: object): Promise<T | null> {
    return await this.model.findByIdAndDelete(id, active);
  }
}

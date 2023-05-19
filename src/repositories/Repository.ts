import { Document, Model, UpdateQuery } from 'mongoose';

export default class Repository<Type extends Document> {
  protected model: Model<Type>;

  constructor(model: Model<Type>) {
    this.model = model;
  }

  public async getAllData(): Promise<Type[]> {
    return await this.model.find();
  }

  public async getOneData(id: string): Promise<Type | null> {
    return await this.model.findById(id);
  }

  public async createOneData(data: object): Promise<Type> {
    const newDocument = await this.model.create(data);
    return newDocument;
  }

  public async updateOneData(
    id: string,
    data: UpdateQuery<Type>
  ): Promise<Type | null> {
    return await this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  public async deleteOneData(
    id: string,
    active?: object
  ): Promise<Type | null> {
    return await this.model.findByIdAndDelete(id, active);
  }
}

export interface IEntity {
  id: string,
  createdAt?: Date,
  updatedAt?: Date | null,
  deletedAt?: Date | null,
}
export class ColumnNumericTransformer {
  //from database to entity - leitura
  from(data: string): number {
    return Number(data);
  }

  //from entity to database - escrita
  to(data: number): number {
    return data;
  }
}

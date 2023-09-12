import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class OrderItem1694540542906 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orderItem',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'quantity',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'pizzaId',
            type: 'int',
          },
          {
            name: 'orderId',
            type: 'uuid',
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('orderItem', [
      new TableForeignKey({
        columnNames: ['pizzaId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pizzas',
      }),
      new TableForeignKey({
        columnNames: ['orderId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'cascade',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orderItem');
  }
}

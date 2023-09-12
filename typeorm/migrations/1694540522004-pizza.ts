import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Pizza1694540522004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pizzas',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'price',
            type: 'numeric',
            precision: 5,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'ingredients',
            type: 'varchar',
            isArray: true,
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pizzas');
  }
}

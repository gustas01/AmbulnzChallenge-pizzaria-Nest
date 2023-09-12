import { Role } from 'src/enums/role/role';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1694452810409 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
            length: '60',
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
            length: '60',
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'roles',
            type: 'varchar',
            isArray: true,
            isNullable: false,
            default: "Array['user']",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}

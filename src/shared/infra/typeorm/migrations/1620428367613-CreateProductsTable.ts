import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateProductsTable1620428367613 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'products',
			columns: [
				{
					name: 'id',
					type: 'varchar',
					isPrimary: true,
					generationStrategy: 'uuid',
					default: 'uuid_generate_v4()',
				},
				{
					name: 'category_id',
					type: 'varchar',
				},
				{
					name: 'name',
					type: 'varchar',
				},
				{
					name: 'manufacturingDate',
					type: 'varchar',
				},
				{
					name: 'perishableProduct',
					type: 'boolean',
				},
				{
					name: 'expirationDate',
					type: 'varchar',
				},
				{
					name: 'price',
					type: 'decimal',
					precision: 10,
					scale: 2
				},
			],
			foreignKeys: [
				{
					name: 'FK_category',
					referencedTableName: 'categories',
					referencedColumnNames: ['id'],
					columnNames: ['category_id'],
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE',
				}
			],
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('products');
	}
}

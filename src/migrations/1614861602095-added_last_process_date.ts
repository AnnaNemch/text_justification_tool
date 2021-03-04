import {MigrationInterface, QueryRunner} from "typeorm";

export class addedLastProcessDate1614861602095 implements MigrationInterface {
    name = 'addedLastProcessDate1614861602095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "last_process_date" date DEFAULT null`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "last_process_date"`);
    }

}

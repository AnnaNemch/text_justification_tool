import {MigrationInterface, QueryRunner} from "typeorm";

export class changedDefaultValueForProcessedWordsColumn1614880721602 implements MigrationInterface {
    name = 'changedDefaultValueForProcessedWordsColumn1614880721602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user"."processed_words" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "processed_words" SET DEFAULT '0'`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."last_process_date" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_process_date" SET DEFAULT null`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."last_process_date" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_process_date" SET DEFAULT null`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_process_date" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."last_process_date" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "last_process_date" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."last_process_date" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "processed_words" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."processed_words" IS NULL`);
    }

}

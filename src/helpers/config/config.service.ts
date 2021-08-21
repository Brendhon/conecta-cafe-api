import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort(): number {
    return +this.getValue('PORT', true);
  }

  public getJwtToken(): string {
    return this.getValue('JWT_SECRET', true);
  }

  public isProduction(): boolean {
    return this.getValue('IS_PROD', false) === 'true';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrationsTableName: 'migrations_typeorm',
      synchronize: true,
      migrations: ['dist/database/migration/*{.ts,.js}'],
      cli: {
        migrationsDir: 'src/database/migration',
      },
      migrationsRun: true,
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { configService };

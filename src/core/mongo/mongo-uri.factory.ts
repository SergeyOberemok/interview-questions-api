import { ConfigService } from '@nestjs/config';

export function MongoUriFactory(configService: ConfigService): {
  uri: string;
} {
  let uri = configService.get<string>('DATABASE_URI') || process.env.DATABASE_URI;
  const host = configService.get<string>('DATABASE_HOST') || process.env.DATABASE_HOST;
  const database = configService.get<string>('DATABASE_DB') || process.env.DATABASE_DB;
  const user = configService.get<string>('DATABASE_USER') || process.env.DATABASE_USER;
  const password = configService.get<string>('DATABASE_PASS') || process.env.DATABASE_PASS;

  uri = uri.replace('${host}', host).replace('${db}', database);

  if (user) {
    uri = uri.replace('${user}', user);
  }

  if (password) {
    uri = uri.replace('${pass}', password);
  }

  return { uri };
}

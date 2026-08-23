# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A NestJS + MongoDB (Mongoose) REST API for managing interview questions, labels, and users. Serves a compiled frontend (`interview-questions-ui`, a sibling repo) as static files in production.

## Commands

```bash
npm run start:dev      # start with watch mode (primary dev loop)
npm run start:debug    # start with --inspect and watch mode
npm run build           # rimraf dist + nest build (sets NODE_ENV=prod)
npm run lint             # eslint --fix over src/apps/libs/test
npm run format          # prettier --write src/**/*.ts test/**/*.ts

npm test                          # unit tests (jest, rootDir: src, matches *.spec.ts)
npm test -- path/to/file.spec.ts  # single unit test file
npm test -- -t "test name"        # filter by test name
npm run test:watch
npm run test:cov
npm run test:e2e                  # jest -c test/jest-e2e.json, matches *.e2e-spec.ts
```

There's no local MongoDB assumption baked into `npm test` — unit tests run against mocked providers. E2E tests boot the full `AppModule`, so a reachable Mongo instance (see `.env`) is required.

## Environment & running against MongoDB

Config comes through `@nestjs/config` (`ConfigModule.forRoot()`), reading a `.env` file. `MongoUriFactory` (`src/core/mongo/mongo-uri.factory.ts`) builds `DATABASE_URI` by substituting `${DATABASE_HOST}`, `${DATABASE_PORT}`, `${DATABASE_DB}` and optionally `${DATABASE_USER}`/`${DATABASE_PASS}` into the template — this factory is the only place that assembles the connection string, so `.env` must set `DATABASE_URI` as a literal template string, not a final URI.

Multiple env files exist for different targets: `.env` (active/local). Match variables against `.env.example` when adding new ones.

### Docker

The `Dockerfile` and `docker-compose.yaml` assume this repo is checked out next to a sibling `interview-questions-ui` repo (build `context: ..`), and multi-stage-build the UI first, copying its `dist` into `./client` where `ServeStaticModule` serves it. `docker-compose.sh` regenerates the root `../.dockerignore` by concatenating both repos' `.dockerignore` files — run it after changing either repo's `.dockerignore`.

```bash
./docker-compose.sh
docker compose -f docker-compose.yaml up -d --build
```

## Architecture

Standard NestJS feature-module layout under `src/`, one directory per domain (`questions`, `labels`, `users`, `auth`), each wired into `AppModule`. Cross-cutting helpers live in `src/core/`.

### Repository split: mutation vs. query

Each domain that talks to Mongo splits its data access into **two repositories**, both injected into the domain's service:

- `<name>.repository.ts` — mutations (`create`, `update`, `remove`)
- `<name>-queries.repository.ts` — reads (`find`, `findAll`, `countAll`), including search/filter logic

Follow this split for any new domain rather than combining reads and writes in one repository class. See `src/questions/repositories/` for the reference implementation.

### Mongo filter helpers

`src/core/mongo/filters.ts` provides composable filter builders (`makeEqualFilter`, `makeInFilter`, `makeOrFilter`, `makeIdFilter`) used by queries repositories to build Mongoose filter objects instead of hand-writing them. `src/core/utils/regexps.ts` provides matching regex builders (`makeLikeRegExp`, `makeRegExps`) for case-insensitive search. Combine these rather than inlining new regex/filter logic in a repository.

### Body transform pipes

Controllers apply per-field transform pipes to `@Body()` before validation/service logic, rather than doing transformation in the service. E.g. `questions.controller.ts` chains `QuestionLabelsTransformPipe` (normalizes/sorts label DTOs) and `QuestionImageTransformPipe` (strips the base64 data-URL prefix and converts to a `Buffer`) on both `create` and `update`. Follow this pattern — add new input-shaping logic as a `PipeTransform` in the domain's `pipes/` directory, not inline in the controller or service.

### Cross-domain composition

Services reach into other domains' services directly (e.g. `QuestionsService` depends on `LabelsService` to resolve/create labels before persisting a question — `findAllOrCreate`). When a question is created/updated, labels are get-or-created first, then attached by value to the question document (labels are embedded subdocuments via `@Prop([LabelSchema])`, not referenced by id).

### Auth

`AuthModule` uses Passport with a local strategy (`src/auth/services/local-strategy.service.ts`) delegating to `AuthService.signIn`, which compares plaintext passwords against `UsersService.findOne` (RxJS-based, not Promise-based — this service is the one place in the codebase using `rxjs` operators like `iif`/`mergeMap` instead of async/await).

### Schemas

Mongoose schemas are defined with `@nestjs/mongoose` decorators (`@Schema`/`@Prop`) alongside a plain TS interface (e.g. `IQuestion`) that the schema class implements. Nested documents (`Answer`, `Label`) are separate schema files composed via `@Prop([SubSchema])` and typed with `Types.DocumentArray<T>` overrides on the `HydratedDocument` type — see `src/questions/schema/question.schema.ts` for the pattern when adding new nested fields.

### One-off scripts vs. migrations

`migration/` holds Mongo shell scripts (`mongosh` syntax, e.g. `rename-question-fields.js`) for one-time data migrations, run manually against the target DB — there's no migration runner/framework wired in. `scripts/` holds MongoDB init scripts (`db.createUser(...)`) mounted into the `db` container via `docker-entrypoint-initdb.d`.

# TSchool

> TSchool is a Event Driven Microservice based School Management System written in TypeScript

The current approach has all services in one monorepo, and is not Microservice based. However all Services will be developped independently and non coupled to other services, at any point it is possible to migrate this to a Microservice architecture.

## Getting Started

Follow these instructions to get the service up and running

### Migrations

You can up/down and create migrations easily using the npm scripts, they will all be ran locally to a sqlite3 databse.

```
npm run migrate:up
npm run migrate:down
npm run migrate:make migration_name
npm run migrate:latest
npm run migrate:rollback
```

Whenever working on a new feature that requires a new Table, think about your model and create it.

```
npm run migrate:make school
```

Then populate the file in migrations/migrationname.ts

### Seeds

You can also write some mocks files that will seed the database tables.

This allows us to share some mock data easily

```
npm run seed:make
npm run seed:run
```

---

Implemented Features

- [ ] TBD

Planned Features

- [ ] TBD

---

## License

Copyright To Be Determined

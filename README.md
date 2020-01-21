# TSchool

> TSchool is a Event Driven Microservice based School Management System written in TypeScript

## Getting Started

Follow these instructions to get the service up and running

### Migrations

You can up/down and create migrations easily using the npm scripts, they will all be ran locally to a sqlite3 databse.

```
npm run migrate:up
npm run migrate:down
npm run migrate:make migration_name
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

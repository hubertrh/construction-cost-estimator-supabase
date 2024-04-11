import {
  pgTable,
  uuid,
  text,
  date,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).unique().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  name: text("project_name").notNull(),
  shortDescription: text("project_short_description").notNull(),
  dueDate: date("due_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  user: varchar("user").references(() => users.email),
});

import { pgTable, text, integer, bigint, timestamp, boolean, jsonb, index, serial, decimal } from 'drizzle-orm/pg-core';

export const submissions = pgTable('submissions', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(), // Keep for backwards compatibility, will be email
  email: text('email').notNull(),
  totalTokens: bigint('total_tokens', { mode: 'number' }).notNull(),
  totalCost: decimal('total_cost', { precision: 10, scale: 4 }).notNull(),
  inputTokens: bigint('input_tokens', { mode: 'number' }).notNull(),
  outputTokens: bigint('output_tokens', { mode: 'number' }).notNull(),
  cacheCreationTokens: bigint('cache_creation_tokens', { mode: 'number' }).notNull(),
  cacheReadTokens: bigint('cache_read_tokens', { mode: 'number' }).notNull(),
  dateRange: jsonb('date_range').$type<{
    start: string;
    end: string;
  }>().notNull(),
  modelsUsed: jsonb('models_used').$type<string[]>().notNull(),
  dailyBreakdown: jsonb('daily_breakdown').$type<Array<{
    date: string;
    inputTokens: number;
    outputTokens: number;
    cacheCreationTokens: number;
    cacheReadTokens: number;
    totalTokens: number;
    totalCost: number;
    modelsUsed: string[];
  }>>().notNull(),
  submittedAt: timestamp('submitted_at').notNull().defaultNow(),
  verified: boolean('verified').notNull().default(false),
  source: text('source', { enum: ['cli', 'web'] }),
  flaggedForReview: boolean('flagged_for_review').default(false),
  flagReasons: jsonb('flag_reasons').$type<string[]>(),
}, (table) => ({
  totalCostIdx: index('submissions_total_cost_idx').on(table.totalCost),
  totalTokensIdx: index('submissions_total_tokens_idx').on(table.totalTokens),
  submittedAtIdx: index('submissions_submitted_at_idx').on(table.submittedAt),
  usernameIdx: index('submissions_username_idx').on(table.username),
  emailIdx: index('submissions_email_idx').on(table.email),
}));

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  username: text('username').notNull(), // Keep for backwards compatibility, will be email
  email: text('email').notNull(),
  totalSubmissions: integer('total_submissions').notNull().default(0),
  bestSubmission: integer('best_submission').references(() => submissions.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  usernameIdx: index('profiles_username_idx').on(table.username),
  emailIdx: index('profiles_email_idx').on(table.email),
}));

export type Submission = typeof submissions.$inferSelect;
export type InsertSubmission = typeof submissions.$inferInsert;
export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = typeof profiles.$inferInsert;
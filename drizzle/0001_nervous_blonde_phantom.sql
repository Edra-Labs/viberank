ALTER TABLE "submissions" ALTER COLUMN "total_tokens" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "submissions" ALTER COLUMN "input_tokens" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "submissions" ALTER COLUMN "output_tokens" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "submissions" ALTER COLUMN "cache_creation_tokens" SET DATA TYPE bigint;--> statement-breakpoint
ALTER TABLE "submissions" ALTER COLUMN "cache_read_tokens" SET DATA TYPE bigint;
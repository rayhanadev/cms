import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_roles_order_idx\` ON \`users_roles\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`users_roles_parent_idx\` ON \`users_roles\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`enable_a_p_i_key\` integer,
  	\`api_key\` text,
  	\`api_key_index\` text,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`service_accounts_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`service_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`service_accounts_roles_order_idx\` ON \`service_accounts_roles\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`service_accounts_roles_parent_idx\` ON \`service_accounts_roles\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`service_accounts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`revoked\` integer DEFAULT false NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`enable_a_p_i_key\` integer,
  	\`api_key\` text,
  	\`api_key_index\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`service_accounts_updated_at_idx\` ON \`service_accounts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`service_accounts_created_at_idx\` ON \`service_accounts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`batch_id\` text,
  	\`discord_message_id\` text,
  	\`discord_user_id\` text,
  	\`source\` text DEFAULT 'manual',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_batch_id_idx\` ON \`media\` (\`batch_id\`);`)
  await db.run(sql`CREATE INDEX \`media_discord_message_id_idx\` ON \`media\` (\`discord_message_id\`);`)
  await db.run(sql`CREATE INDEX \`media_discord_user_id_idx\` ON \`media\` (\`discord_user_id\`);`)
  await db.run(sql`CREATE INDEX \`media_source_idx\` ON \`media\` (\`source\`);`)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`events_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`data\` text NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_stats_order_idx\` ON \`events_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_stats_parent_id_idx\` ON \`events_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`events_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`events_images_order_idx\` ON \`events_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`events_images_parent_id_idx\` ON \`events_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`events_images_image_idx\` ON \`events_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`events\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`published\` integer DEFAULT false NOT NULL,
  	\`event_type\` text DEFAULT 'hack-night' NOT NULL,
  	\`start\` text NOT NULL,
  	\`end\` text,
  	\`location_name\` text,
  	\`location_url\` text,
  	\`description\` text NOT NULL,
  	\`send\` integer DEFAULT false,
  	\`sent_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`events_updated_at_idx\` ON \`events\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`events_created_at_idx\` ON \`events\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`emails\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`event_id\` integer NOT NULL,
  	\`subject\` text DEFAULT 'Reminder: Purdue Hackers event starting soon!!!' NOT NULL,
  	\`body\` text DEFAULT 'Hi there!
  
  This is a friendly reminder that the event is coming up soon. We look forward to seeing you there!' NOT NULL,
  	\`send\` integer DEFAULT false,
  	\`sent_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`emails_event_idx\` ON \`emails\` (\`event_id\`);`)
  await db.run(sql`CREATE INDEX \`emails_updated_at_idx\` ON \`emails\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`emails_created_at_idx\` ON \`emails\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`rsvps\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`email\` text NOT NULL,
  	\`name\` text,
  	\`event_id\` integer NOT NULL,
  	\`unsubscribed\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`rsvps_event_idx\` ON \`rsvps\` (\`event_id\`);`)
  await db.run(sql`CREATE INDEX \`rsvps_updated_at_idx\` ON \`rsvps\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`rsvps_created_at_idx\` ON \`rsvps\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`hack_night_sessions_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`hack_night_sessions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`hack_night_sessions_images_order_idx\` ON \`hack_night_sessions_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`hack_night_sessions_images_parent_id_idx\` ON \`hack_night_sessions_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`hack_night_sessions_images_image_idx\` ON \`hack_night_sessions_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`hack_night_sessions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`date\` text NOT NULL,
  	\`published\` integer DEFAULT false NOT NULL,
  	\`host_preferred_name\` text NOT NULL,
  	\`host_discord_id\` text,
  	\`description\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`hack_night_sessions_date_idx\` ON \`hack_night_sessions\` (\`date\`);`)
  await db.run(sql`CREATE INDEX \`hack_night_sessions_updated_at_idx\` ON \`hack_night_sessions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`hack_night_sessions_created_at_idx\` ON \`hack_night_sessions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`shelter\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`name\` text NOT NULL,
  	\`last_division\` text NOT NULL,
  	\`last_owner\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`shelter_image_idx\` ON \`shelter\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`shelter_updated_at_idx\` ON \`shelter\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`shelter_created_at_idx\` ON \`shelter\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`microgrants\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`visible\` integer DEFAULT true,
  	\`name\` text NOT NULL,
  	\`author\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`author_url\` text,
  	\`project_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`microgrants_image_idx\` ON \`microgrants\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`microgrants_updated_at_idx\` ON \`microgrants\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`microgrants_created_at_idx\` ON \`microgrants\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`redirects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`from\` text NOT NULL,
  	\`to_type\` text DEFAULT 'reference',
  	\`to_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`redirects_from_idx\` ON \`redirects\` (\`from\`);`)
  await db.run(sql`CREATE INDEX \`redirects_updated_at_idx\` ON \`redirects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`redirects_created_at_idx\` ON \`redirects\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`redirects_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`events_id\` integer,
  	\`shelter_id\` integer,
  	\`microgrants_id\` integer,
  	\`hack_night_sessions_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`events_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`shelter_id\`) REFERENCES \`shelter\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`microgrants_id\`) REFERENCES \`microgrants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`hack_night_sessions_id\`) REFERENCES \`hack_night_sessions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`redirects_rels_order_idx\` ON \`redirects_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_parent_idx\` ON \`redirects_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_path_idx\` ON \`redirects_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_events_id_idx\` ON \`redirects_rels\` (\`events_id\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_shelter_id_idx\` ON \`redirects_rels\` (\`shelter_id\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_microgrants_id_idx\` ON \`redirects_rels\` (\`microgrants_id\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_hack_night_sessions_id_idx\` ON \`redirects_rels\` (\`hack_night_sessions_id\`);`)
  await db.run(sql`CREATE TABLE \`search\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`priority\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`search_updated_at_idx\` ON \`search\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`search_created_at_idx\` ON \`search\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`search_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`events_id\` integer,
  	\`shelter_id\` integer,
  	\`microgrants_id\` integer,
  	\`hack_night_sessions_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`events_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`shelter_id\`) REFERENCES \`shelter\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`microgrants_id\`) REFERENCES \`microgrants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`hack_night_sessions_id\`) REFERENCES \`hack_night_sessions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`search_rels_order_idx\` ON \`search_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_parent_idx\` ON \`search_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_path_idx\` ON \`search_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_events_id_idx\` ON \`search_rels\` (\`events_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_shelter_id_idx\` ON \`search_rels\` (\`shelter_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_microgrants_id_idx\` ON \`search_rels\` (\`microgrants_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_hack_night_sessions_id_idx\` ON \`search_rels\` (\`hack_night_sessions_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_mcp_api_keys\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`user_id\` integer NOT NULL,
  	\`label\` text,
  	\`description\` text,
  	\`events_find\` integer DEFAULT false,
  	\`rsvps_find\` integer DEFAULT false,
  	\`hack_night_sessions_find\` integer DEFAULT false,
  	\`shelter_find\` integer DEFAULT false,
  	\`microgrants_find\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`enable_a_p_i_key\` integer,
  	\`api_key\` text,
  	\`api_key_index\` text,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_mcp_api_keys_user_idx\` ON \`payload_mcp_api_keys\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_mcp_api_keys_updated_at_idx\` ON \`payload_mcp_api_keys\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_mcp_api_keys_created_at_idx\` ON \`payload_mcp_api_keys\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`service_accounts_id\` integer,
  	\`media_id\` integer,
  	\`events_id\` integer,
  	\`emails_id\` integer,
  	\`rsvps_id\` integer,
  	\`hack_night_sessions_id\` integer,
  	\`shelter_id\` integer,
  	\`microgrants_id\` integer,
  	\`redirects_id\` integer,
  	\`search_id\` integer,
  	\`payload_mcp_api_keys_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`service_accounts_id\`) REFERENCES \`service_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`events_id\`) REFERENCES \`events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`emails_id\`) REFERENCES \`emails\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`rsvps_id\`) REFERENCES \`rsvps\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`hack_night_sessions_id\`) REFERENCES \`hack_night_sessions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`shelter_id\`) REFERENCES \`shelter\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`microgrants_id\`) REFERENCES \`microgrants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`redirects_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`search_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`payload_mcp_api_keys_id\`) REFERENCES \`payload_mcp_api_keys\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_service_accounts_id_idx\` ON \`payload_locked_documents_rels\` (\`service_accounts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_events_id_idx\` ON \`payload_locked_documents_rels\` (\`events_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_emails_id_idx\` ON \`payload_locked_documents_rels\` (\`emails_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_rsvps_id_idx\` ON \`payload_locked_documents_rels\` (\`rsvps_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_hack_night_sessions_id_idx\` ON \`payload_locked_documents_rels\` (\`hack_night_sessions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_shelter_id_idx\` ON \`payload_locked_documents_rels\` (\`shelter_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_microgrants_id_idx\` ON \`payload_locked_documents_rels\` (\`microgrants_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_redirects_id_idx\` ON \`payload_locked_documents_rels\` (\`redirects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_search_id_idx\` ON \`payload_locked_documents_rels\` (\`search_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_payload_mcp_api_keys_id_idx\` ON \`payload_locked_documents_rels\` (\`payload_mcp_api_keys_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`service_accounts_id\` integer,
  	\`payload_mcp_api_keys_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`service_accounts_id\`) REFERENCES \`service_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`payload_mcp_api_keys_id\`) REFERENCES \`payload_mcp_api_keys\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_service_accounts_id_idx\` ON \`payload_preferences_rels\` (\`service_accounts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_payload_mcp_api_keys_id_idx\` ON \`payload_preferences_rels\` (\`payload_mcp_api_keys_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_roles\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`service_accounts_roles\`;`)
  await db.run(sql`DROP TABLE \`service_accounts\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`events_stats\`;`)
  await db.run(sql`DROP TABLE \`events_images\`;`)
  await db.run(sql`DROP TABLE \`events\`;`)
  await db.run(sql`DROP TABLE \`emails\`;`)
  await db.run(sql`DROP TABLE \`rsvps\`;`)
  await db.run(sql`DROP TABLE \`hack_night_sessions_images\`;`)
  await db.run(sql`DROP TABLE \`hack_night_sessions\`;`)
  await db.run(sql`DROP TABLE \`shelter\`;`)
  await db.run(sql`DROP TABLE \`microgrants\`;`)
  await db.run(sql`DROP TABLE \`redirects\`;`)
  await db.run(sql`DROP TABLE \`redirects_rels\`;`)
  await db.run(sql`DROP TABLE \`search\`;`)
  await db.run(sql`DROP TABLE \`search_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_mcp_api_keys\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
}

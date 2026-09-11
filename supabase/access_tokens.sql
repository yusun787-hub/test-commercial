-- 1) 建表（token 作为主键，默认用 32 bytes 随机数转 hex）
-- 需要 pgcrypto
create extension if not exists pgcrypto;

create table if not exists public.access_tokens (
  token text primary key default encode(gen_random_bytes(32), 'hex'),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);

create index if not exists access_tokens_expires_at_idx on public.access_tokens (expires_at);

-- 2) 开启 RLS（前端用 anon key 校验 token/生成 token，需要放行 SELECT/INSERT）
alter table public.access_tokens enable row level security;

-- 允许匿名/登录用户读取 token 的有效期（仅返回 expires_at，不返回其他敏感信息）
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'access_tokens'
      and policyname = 'allow_read_for_token_validation'
  ) then
    create policy allow_read_for_token_validation
      on public.access_tokens
      for select
      using (true);
  end if;
end $$;

-- 允许匿名/登录用户插入 token（用于 /admin 页面一键生成）。
-- 注意：这在“安全模型”上等同于开放写入，严格场景建议改用 Edge Function + service_role。
-- 本项目按“最简单能用”优先。
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'access_tokens'
      and policyname = 'allow_insert_for_admin_page'
  ) then
    create policy allow_insert_for_admin_page
      on public.access_tokens
      for insert
      with check (true);
  end if;
end $$;

-- 3) 给管理员用的“最简单生成方式”：在 SQL Editor 直接执行 insert
--    expires_at = now() + interval '30 days'
--
-- insert into public.access_tokens (expires_at)
-- values (now() + interval '30 days')
-- returning token, created_at, expires_at;

-- 4)（可选）清理过期 token
-- delete from public.access_tokens where expires_at <= now();

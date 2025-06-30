-- ตารางหมู่บ้าน
create table villages (
  id serial primary key,
  name varchar(50) not null
);

-- ตารางโครงการ
create table projects (
  id serial primary key,
  village_id integer references villages(id),
  name varchar(100) not null,
  description text,
  image_url text,
  location varchar(100)
);

-- ตารางคะแนน
create table scores (
  id serial primary key,
  project_id integer references projects(id),
  score_value integer not null check (score_value >= 1 and score_value <= 10),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- View สำหรับคะแนนเฉลี่ยของแต่ละโครงการ
create or replace view projects_with_avg_score as
select
  p.*,
  avg(s.score_value)::float as avg_score
from projects p
left join scores s on p.id = s.project_id
group by p.id; 
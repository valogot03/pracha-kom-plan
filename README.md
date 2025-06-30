# Pracha Kom Plan

Full Stack Web (Next.js + Supabase) สำหรับจัดการโครงการในแต่ละหมู่บ้าน

## วิธีเริ่มต้น

1. คัดลอก `.env.local.example` เป็น `.env.local` และใส่ค่า Supabase ของคุณ
2. ติดตั้ง dependencies ด้วย `npm install`
3. รัน dev server ด้วย `npm run dev`

## Deploy บน Vercel
- Push โค้ดขึ้น GitHub แล้วเชื่อมต่อกับ Vercel
- ตั้งค่า Environment Variables ใน Vercel ให้ตรงกับ `.env.local`

## SQL Schema (Supabase)
ดูในไฟล์ `supabase_schema.sql` 
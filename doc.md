# Prisma & DB Setup

`npm i -D prisma `và `npx prisma init` => viết model => `npx prisma generate` và `npx prisma db push` => `npm i @prisma/client`

tạo `lib/db.ts`

```ts
/* eslint-disable no-var */
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}
export const db = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = db;
```

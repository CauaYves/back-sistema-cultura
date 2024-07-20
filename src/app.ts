import { connectDb, disconnectDB } from "@/config";
import { handleApplicationErrors } from "@/middlewares";
import {
  authrouter,
  classificationRouter,
  collectiveRouter,
  contactRouter,
  enrollmentsRouter,
  ibgeRouter,
  noticePreviewRouter,
  noticeRouter,
} from "@/routers";
import cors from "cors";
import express, { Express } from "express";
import "express-async-errors";

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("Status da aplicação: ✅ Em execução"))
  .use("/auth", authrouter)
  .use("/enrollment", enrollmentsRouter)
  .use("/notice-classification", classificationRouter)
  .use("/contact", contactRouter)
  .use("/collective", collectiveRouter)
  .use("/notice", noticeRouter)
  .use("/noticePreview", noticePreviewRouter)
  .use("/ibge", ibgeRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;

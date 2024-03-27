import { Request, Response } from "express";

export const createProject = async (req: Request, res: Response) => {
  const [userId, title, description, imageUrls] = req.body;

};
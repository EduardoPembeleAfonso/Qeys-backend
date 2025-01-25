import { ErrosMessages } from "@/helpers";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { badRequestResponse, errorResponse, unauthorized } from "../contracts";
import { IUserRepositoryPrismaImpl } from "@/infra";
import { IPayLoadProps } from "../interfaces";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response
      .status(401)
      .json(unauthorized(ErrosMessages.tokenIsRequires));
  }

  const userRepository = new IUserRepositoryPrismaImpl();
  const [, token] = authHeader.split(" ");

  if (!token) {
    return response
      .status(401)
      .json(unauthorized(ErrosMessages.tokenIsRequires));
  }

  try {
    const { id } = verify(token, "test-biva-api") as IPayLoadProps;
    const user = await userRepository.findBySpecificId(id);

    if (!user) {
      return response
        .status(400)
        .json(badRequestResponse({ message: ErrosMessages.UserNotExists }));
    }

    next();
  } catch (error: any) {
    return response
      .status(500)
      .json(errorResponse(error?.message || "Internal server error"));
  }
}

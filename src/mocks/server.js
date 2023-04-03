import { setupServer } from "msw/node";
import { authHandlers } from "@mocks/handlers/auth";
import { userHandlers } from "./handlers/user";
import { notificationHandlers } from "./handlers/notifications";

// Setup requests interception using the given handlers
export const server = setupServer(...authHandlers, ...userHandlers, ...notificationHandlers);

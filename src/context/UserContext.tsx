import React from "react";
import AuthenticatedUser from "../interfaces/AuthenticatedUser";

// Create context
export default React.createContext<AuthenticatedUser | null>(null);
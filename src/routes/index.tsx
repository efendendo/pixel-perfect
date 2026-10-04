import type { RouteObject } from "react-router";

import { ErrorComponent, NotFoundComponent, RootComponent } from "./root";
import { requireUser } from "./authenticated";
import Index from "@/pages/Index";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import AppPage from "@/pages/AppPage";

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: RootComponent,
    ErrorBoundary: ErrorComponent,
    HydrateFallback: () => null,
    children: [
      { index: true, Component: Index },
      { path: "signin", Component: SignIn },
      { path: "signup", Component: SignUp },
      { path: "app", loader: requireUser, Component: AppPage },
      { path: "*", Component: NotFoundComponent },
    ],
  },
];

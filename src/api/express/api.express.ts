import { Api } from "../api";
import express, { Express, Request, Response } from "express";

export class ApiExpress implements Api {
  private constructor(readonly app: Express) {}

  public static build() {
    const app = express();
    app.use(express.json());
    return new ApiExpress(app);
  }

  public addGetRoute(
    path: string,
    handle: (req: Request, res: Response) => Promise<void>
  ): void {
    this.app.get(path, handle);
  }

  public addPostRoute(
    path: string,
    handle: (req: Request, res: Response) => Promise<void>
  ): void {
    this.app.post(path, handle); // fixed
  }

  public async start(port: number): Promise<void> {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      this.printRoutes();
    });
  }

  private printRoutes(): void {
    const router = (this.app as any)._router;
    if (!router || !router.stack) {
      console.log("Nenhuma rota registrada.");
      return;
    }

    const routes = router.stack
      .filter((layer: any) => layer.route)
      .map((layer: any) => ({
        path: layer.route.path,
        method: layer.route.stack[0].method.toUpperCase(),
      }));

    console.log("Rotas registradas:", routes);
  }
}

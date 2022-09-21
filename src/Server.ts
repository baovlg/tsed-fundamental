import { join } from "path";
import { Configuration, Inject } from "@tsed/di";
import { PlatformApplication } from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import { config } from "./config/index";
import * as rest from "./controllers/rest/index";
import { ModuleV1 } from "./controllers/modules/ModuleV1";
import { ModuleV2 } from "./controllers/modules/ModuleV2";
import { ProductController } from "./controllers/rest/v1/ProductController";

export const rootDir = __dirname || process.cwd();
@Configuration({
  ...config,
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  componentsScan: false,
  imports: [ModuleV1, ModuleV2],
  mount: {
    "/rest/v1": [...Object.values(rest), ProductController],
  },
  middlewares: [
    cors(),
    cookieParser(),
    compress({}),
    methodOverride(),
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true,
    }),
  ],
  views: {
    root: join(rootDir, "./views"),
    extensions: {
      ejs: "ejs",
    },
  },
  exclude: ["**/*.spec.ts"],
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;
}

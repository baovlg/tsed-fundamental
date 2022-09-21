import {Module} from "@tsed/di";
import { ProxyController } from "../rest/v2/ProxyController";

@Module({
  mount: {
    "/rest/v2": [ProxyController]
  }
})
export class ModuleV2 {}
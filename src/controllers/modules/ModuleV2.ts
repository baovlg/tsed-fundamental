import { Module } from "@tsed/di";
import { HelloWorldController } from "../rest/v2/HelloWorldController";

@Module({
  mount: {
    "/rest/v2": [HelloWorldController],
  },
})
export class ModuleV2 {}

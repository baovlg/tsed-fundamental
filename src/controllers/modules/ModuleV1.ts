import { Module } from "@tsed/di";
import { CrudController } from "../rest/v1/CrudController";
import { LocalController } from "../rest/v1/LocalController";

@Module({
  mount: {
    "/rest/v1": [CrudController, LocalController],
  },
})
export class ModuleV1 {}

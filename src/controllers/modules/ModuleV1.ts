import { Module } from "@tsed/di";
import { CalendarController } from "../rest/v1/CalendarController";
import { LocalController } from "../rest/v1/LocalController";

@Module({
  mount: {
    "/rest/v1": [CalendarController, LocalController],
  },
})
export class ModuleV1 {}

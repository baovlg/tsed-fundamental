import { PlatformResponse, Res } from "@tsed/common";
import { Controller } from "@tsed/di";
import { PathParams, BodyParams, QueryParams } from "@tsed/platform-params";
import { Get, Post, Property } from "@tsed/schema";
import { createReadStream, ReadStream } from "fs";
import { Observable, of } from "rxjs";

interface Calendar {
  id: string;
  name: string;
}

class Product {
  @Property()
  title: string;
}

@Controller("/calendars")
export class CalendarController {
  @Get("/")
  get(): Promise<Calendar[]> {
    return Promise.resolve([
      { id: "1", name: "test 1" },
      { id: "2", name: "test 2" },
    ]);
  }

  // observable
  @Get("/observable")
  observable(): Observable<any[]> {
    return of([]);
  }

  // stream
  @Get("/:id/stream")
  stream(): ReadStream {
    return createReadStream(__dirname + "/ProxyController.ts");
  }

  //buffer
  @Get("/:id/buffer")
  buffer(@Res() res: PlatformResponse): Buffer {
    // Set attachment: res.attachment("filename")
    // Set contentType: res.contentType("plain/text");

    return Buffer.from("Hello");
  }

  // promise
  @Get("/:id")
  @Get("/alias/:id")
  @Post("/:id/complexAlias")
  async getDetail(@PathParams("id") id: string): Promise<Calendar> {
    return {
      id,
      name: "test",
    };
  }
}

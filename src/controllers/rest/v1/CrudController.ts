import { PlatformResponse, Res } from "@tsed/common";
import { Controller } from "@tsed/di";
import { PathParams } from "@tsed/platform-params";
import { Get, MinLength, Post, Property } from "@tsed/schema";
import { createReadStream, ReadStream } from "fs";
import dirname from "path";
import { Observable, of } from "rxjs";

interface Crud {
  id: string;
  name: string;
}

@Controller("/cruds")
export class CrudController {
  @Get("/")
  get(): Promise<Crud[]> {
    return Promise.resolve([
      { id: "1", name: "test 1" },
      { id: "2", name: "test 2" },
    ]);
  }

  @Get("/:id")
  getDetail(id: string) {
    return `This action returns a #${id}`;
  }

  // promise | Multiple endpoints
  @Get("/alias/:id")
  @Post("/:id/complexAlias")
  async promise(
    @PathParams("id")
    id: string
  ): Promise<Crud> {
    return { id, name: "test" };
  }

  // observable
  @Get("/:id/observable")
  observable(): Observable<any[]> {
    return of([]);
  }

  // stream
  @Get("/:id/stream")
  stream(): ReadStream {
    return createReadStream(dirname + "/ProxyController.ts");
  }

  //buffer
  @Get("/:id/buffer")
  buffer(@Res() res: PlatformResponse): Buffer {
    // Set attachment: res.attachment("filename")
    // Set contentType: res.contentType("plain/text");

    return Buffer.from("Hello");
  }
}

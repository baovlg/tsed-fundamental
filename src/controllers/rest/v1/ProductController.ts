import { Controller } from "@tsed/di";
import { BodyParams } from "@tsed/platform-params";
import { MinLength, Post, Property, Required } from "@tsed/schema";
import Product from "../../../models/Product";

@Controller("/products")
export class ProductController {
  @Post()
  updatePayload(@BodyParams() payload: string): any {
    console.log("payload", payload);

    return payload;
  }

  // body with array
  updatePayloadWithArrayString(@BodyParams() payload: string[]): any {
    console.log("payload", payload);

    return payload;
  }

  // body with model
  updatePayloadWithModel(@BodyParams(Product) products: Product[]): Product[] {
    console.log("products", products);

    return products;
  }

  updatePayloadInlineValidation(
    @BodyParams() @Required() @MinLength(3) payload: string
  ): any {
    console.log("payload", payload);

    return payload;
  }
}

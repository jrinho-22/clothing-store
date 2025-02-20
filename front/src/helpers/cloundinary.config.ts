import { Cloudinary } from "@cloudinary/url-gen/index";
import { cloudinaryId } from "./conts";

export const cld = new Cloudinary({
    cloud: {
        cloudName: cloudinaryId
    }
});
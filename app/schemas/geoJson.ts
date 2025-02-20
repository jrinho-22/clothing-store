import { Schema } from '../helpers/const'
import { IGeo } from '../interface/IGeoDto';

export const geoSchema = new Schema<IGeo>({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

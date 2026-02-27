import { Schema, model } from 'mongoose';
import { IClub } from '../interfaces/club.interface';

const clubSchema = new Schema<IClub>(
    {
        clubId: {
            type: Number,
            required: true,
        },

        name: { type: String },
        regionId: { type: Number },


        stats: {
            type: Schema.Types.Mixed,
            required: true,
            default: {}
        }
    },
    {
        timestamps: true,
        collection: 'clubs',
        versionKey: false
    }
);

clubSchema.index({ clubId: 1 }, { unique: true });

const ClubModel = model<IClub>('clubs', clubSchema);
export default ClubModel;

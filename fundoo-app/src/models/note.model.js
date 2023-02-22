import { Schema, model } from 'mongoose';

const noteSchema = new Schema({
    userId: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    color: {
        type: String
    },
    archive: {
        type: Boolean,
        default: false
    },
    trash: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

export default model('Note', noteSchema);
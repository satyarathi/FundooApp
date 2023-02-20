import Note from '../models/note.model';

//get all users
export const getAllNote = async() => {
    const data = await Note.find();
    return data;
};

//create new user
export const createNote = async(body) => {
    const data = await Note.create(body);
    return data;
};

//update single user
export const updateNote = async(_id, body) => {
    const data = await Note.findByIdAndUpdate({
            _id
        },
        body, {
            new: true
        }
    );
    return data;
};

//delete single user
export const deleteNote = async(id) => {
    await Note.findByIdAndDelete(id);
    return '';
};

//get single user
export const getNoteById = async(id) => {
    const data = await Note.findById(id);
    return data;
};
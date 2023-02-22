import Note from '../models/note.model';
import User from '../models/note.model';

//get all note
export const getAllNote = async(userId) => {
    const data = await Note.find(userId);
    return data;
};

//create new note
export const createNote = async(body) => {
    const data = await Note.create(body);
    return data;
};

//update single note
export const updateNote = async(_id, body, userId) => {
    const data = await Note.dataByIdAndUpdate(_id, body, userId)
    return data;
}



//delete single note
export const deleteNote = async(_id, userId) => {
    await Note.findByIdAndDelete(_id, userId);
    return '';
};

//get single note
export const getNoteById = async(_id, userId) => {
    const data = await Note.findById(_id, userId);
    return data;
};

export const archiveNote = async(id) => {
    const data = await Note.findById(id);
    if (data != null) {
        const isArchived = data.archive === false ? true : false;
        const newUser = {
            title: data.title,
            description: data.description,
            color: data.color,
            archive: isArchived,
        };
        const find = await Note.findByIdAndUpdate(id, newUser)
        return find;
    }

};

export const trashNote = async(id) => {
    const data = await Note.findById(id)
    if (data != null) {
        const isTrashed = data.archive === false ? true : false;
        const newUser = {
            title: data.title,
            description: data.description,
            color: data.color,
            trash: isTrashed
        };
        const result = await Note.findByIdAndUpdate(id, newUser)
        return result;
    }
};
import Note from '../models/note.model';
import { client } from '../config/redis';

//get all note
export const getAllNote = async(userId) => {
    const data = await Note.find({userId: userId});
    await client.set('getall', JSON.stringify(data))
    return data;
};

//create new note
export const createNote = async (body) => {
    await client.del('getall');
    console.log("get del",await client.del('getall'));
    const data = await Note.create(body);
    return data;
  };

//update single note
export const updateNote = async(id, body, userId) => {
    const data = await Note.findByIdAndUpdate({id: id,
    userId: userId}, body, {
        new: true
    })
    return data;
}

//delete single note
export const deleteNote = async(_id, userId) => {
    await Note.findByIdAndDelete({id: _id, userId: userId});
    return '';
};

//get single note
export const getNoteById = async(_id, userId) => {
    const data = await Note.findById({id: _id, userId: userId});
    return data;
};

//archive the note
export const archiveNote = async(id, userId) => {
    const data = await Note.findOne({id: _id, userId: userId});
    if (data != null) {
        const isArchived = data.archive === false ? true : false;
        const newUser = {
    console.log(data);
    return data;
};

export const archiveNote = async(_id) => {
    const data = await Note.findById(_id);
    if (data != null) {
        const isArchived = data.archive === false ? true : false;
        const newNote = {

            title: data.title,
            description: data.description,
            color: data.color,
            archive: isArchived,
        };

        const find = await Note.findByIdAndUpdate(id, newUser)
        return find;
    }

};

//trash the note
export const trashNote = async(id, userId) => {
    const data = await Note.findOne({id: _id, userId: userId})
    if (data != null) {
        const isTrashed = data.archive === false ? true : false;
        const newUser = {
=======
        const find = await updateNote(_id, newNote)
        return find;
    }
};

export const trashNote = async(_id) => {
    const data = await Note.findById(_id)
    if (data != null) {
        const isTrashed = data.archive === false ? true : false;
        const newNote = {
            title: data.title,
            description: data.description,
            color: data.color,
            trash: isTrashed
        };

        const result = await Note.findByIdAndUpdate(id, newUser)

        const result = await updateNote(_id, newNote)

        return result;
    }
};
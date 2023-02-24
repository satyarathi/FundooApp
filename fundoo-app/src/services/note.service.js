import Note from '../models/note.model';

//get all note
export const getAllNote = async() => {
    const data = await Note.find();
    return data;
};

//create new note
export const createNote = async(body) => {
    const data = await Note.create(body);
    return data;
};

//update single note
export const updateNote = async(id, body) => {
    const data = await Note.findByIdAndUpdate(id, body, {
        new: true
    })
    return data;
}

//delete single note
export const deleteNote = async(_id) => {
    await Note.findByIdAndDelete(_id);
    return '';
};

//get single note
export const getNoteById = async(_id) => {
    const data = await Note.findById(_id);
    return data;
};

//archive the note
export const archiveNote = async(id) => {
    const data = await Note.findById(id);
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
export const trashNote = async(id) => {
    const data = await Note.findById(id)
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
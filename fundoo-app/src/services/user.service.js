import User from '../models/user.model';

//create new registration
export const newUserRegistration = async(body) => {
    const data = await User.create(body);
    return data;
};
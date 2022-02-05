import { toast } from 'react-toastify';
import axios from "axios";
import APIURL from "../helpers/urlSwitch";

const updateUser = async (e: any, CurrentUser:any, form: any, SetCurrentUser: any) => {
    e.preventDefault();
    console.log(form, CurrentUser)
    let username = form.name.trim();
    let avatar = form.avatar;

    // Any fields are null
    if (username === "") {
        return toast.error("Please ensure the name field is filled in!")
    }

    // Get user request and set to CurrentUser context
    let userId = CurrentUser.id
    let request = await axios.put(
        `${APIURL}/user/${CurrentUser.id}`,
        { username, avatar, userId },
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    let data = request.data;
    if (data && data.updatedUser) {
        let updatedUser = data.updatedUser;
        toast.success("Successfully updated data!");
        setTimeout(() => {
            SetCurrentUser(updatedUser);
        }, 300)
    } else {
        toast.error(data.message)
    }
}

export { updateUser }
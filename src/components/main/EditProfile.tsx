import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import UserUpdateContext from "../../context/UserUpdateContext";
import UserContext from "../../context/UserContext";
import { updateUser } from "../../helpers/user";
import FormInput from "../reusable/FormInput";
import defaultAvatar from "../../assets/avatar.png";

export default () => {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const SetCurrentUser = useContext(UserUpdateContext);
    const CurrentUser = useContext(UserContext);

    return (
        <div className="profile-container">
            <div className="background-overlay"></div>

            <div className="content">
                <form action="PUT">
                    <h1>Edit Profile</h1>
                    {/* Avatar */}
                    <div className="avatar">
                        <figure><img src={defaultAvatar} alt="User avatar" /></figure>
                        <div className="files">
                            <span>Current: <br /> skdjfhskjdfhsDFakjdahkjdhsufbsfk</span>
                            <input className="file-input" type="file" name="avatar" />
                        </div>
                    </div>
                    {/* Name */}
                    <FormInput
                        forId="username"
                        incomingFor="username"
                        handleChange={setName}
                        label="Name"
                        type="text"
                        value={name}
                    />
                    <div className="form-footer">
                        <NavLink to="/rooms" className="form-footer--link">
                            <span>Go back</span>
                        </NavLink>
                        <button type="submit"
                        onClick={e => updateUser(
                            e,
                            CurrentUser,
                            {
                                name,
                                avatar
                            },
                            SetCurrentUser
                        )}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
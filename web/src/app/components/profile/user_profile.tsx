import { useRecoilValue } from "recoil";
import { userInfoState } from "../../store/selectors/user-selector";
const Profile=()=>{
     const { name, id } = useRecoilValue(userInfoState);
    
    return (
        <div>
            <h1>Profile</h1>
            <h2>Name: {name}</h2>
            <h2>ID: {id}</h2>
        </div>
    );
}
export default Profile;
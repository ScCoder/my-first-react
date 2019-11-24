import React ,{useState,useEffect}from 'react';
import defProfilePhoto from '../../../assets/images/defProfilePhoto.png'
import {Field, reduxForm} from 'redux-form';
import { Input } from '../../FormControls/FormControls';
import { required } from '../../../utils/validators/validators';
import Error from '../../Common/Error'


const ProfileInfo = ({ profile, isCurrentUser, ...props }) => {

    const [editDataMode, setEditDataMode] = useState(false);

    const OnSetEditDataMode = () => {

        setEditDataMode(true);
    }

    const SaveProfileData = (values) => {
        props.SaveProfileThunk(values);
    //    setEditDataMode(false);
    }

    return (
        <div>
            <ProfilePhoto SavePhoto={props.SavePhoto} photos={profile.photos} isCurrentUser={isCurrentUser} />
            <ProfileStatus
                SaveStatusThunk={props.SaveStatusThunk}
                ChangeStatus={props.ChangeStatus}
                GetStatusThunk={props.GetStatusThunk}
                status={props.status}
                isCurrentUser={isCurrentUser}
                userIdInURL={props.userIdInURL}
            />
            
            {isCurrentUser && !editDataMode && <button onClick={OnSetEditDataMode}>Редактировать</button>}

            {editDataMode ? <ProfileDataEditFormRedux onSubmit = {SaveProfileData} profile={profile} initialValues={profile} /> : <ProfileData profile={profile} />}

        </div>
    )

}

const ProfilePhoto = ({photos,SavePhoto,isCurrentUser}) =>{

    const onFileSelected = (e) =>{
        if (e.target.files.length > 0){
            SavePhoto(e.target.files[0]);
        }
    }
    return (
        <div>
        <div>
            <img src={photos.large || defProfilePhoto} width='300px'></img>
        </div>
        {isCurrentUser && <div><input type='file' onChange={onFileSelected}/></div>}
        </div>


    )
}

const ProfileStatus = ({status,SaveStatusThunk,GetStatusThunk,ChangeStatus,isCurrentUser,userIdInURL}) => {

    const [editMode, setEditMode] = useState(false);

    useEffect(()=>{    
           
        GetStatusThunk(userIdInURL); 
               
    },[userIdInURL])

    const ActivateEditMode = () => {
        if (isCurrentUser) {
            setEditMode(true);
        }
    }

    const DeactivateEditMode = () => {
        setEditMode(false);
        SaveStatusThunk(status);
    }

    const onStatusChange = (e) => {
        ChangeStatus(e.target.value);
    }

    return (<div>
        {!editMode && <div onClick={ActivateEditMode}> {status}</div>}
        {editMode && <textarea autoFocus={true} onBlur={DeactivateEditMode} onChange={onStatusChange} value={status} />}
    </div>
    )
}

const ProfileData = ({profile})=>{

    const contacts = profile.contacts;
    const contactsElements = Object.keys(contacts).map((key)=>{ return ( <div key={key}>{key}: {contacts[key]} </div> )   });

    return(
        <div>
            <div>Обо мне: {profile.aboutMe}</div>
            <div>Полное имя: {profile.fullName}</div>
            <div>Ищет работу: {profile.lookingForAJob?'Да':'Нет'}</div>
            <div>{profile.lookingForAJobDescription}</div>
            <div>Контыкты:</div>
            {contactsElements}
        </div>
    )
}

const ProfileDataEditForm = ({profile,error,...props})=>{

    const contacts = profile.contacts;
    const contactsElements = Object.keys(contacts).map((key)=>{ return ( <span key={key}>{key}: <Field name={'contacts.'+key} placeholder={key} component={Input} /></span> )   });

    return(
        <form onSubmit={props.handleSubmit}>
            <Error error={error}/>    
            <div>
                <Field name="aboutMe" placeholder='Обо мне' component={Input} validate = {[required]} />
            </div>            
            <div>
                <Field name="fullName" placeholder='Полное имя' component={Input}/>
            </div>
            <div>
                <Field name="lookingForAJob" type='checkbox' component='input'/>
            </div>
            <div>
                <Field name="lookingForAJobDescription" placeholder='Поиск работы подробности' component={Input}/>
            </div>
            <div>
            <div>Контыкты:</div>    
            {contactsElements}
            </div>
            <div>
                <button>Сохранить</button>
            </div>
        </form>
    )
}

const mstp = (state) =>{
    return {
        initialValues: state.profilePage.profile
    }
}


//const ProfileDataEditFormRedux = connect(mstp)(reduxForm({form:'profileData'})(ProfileDataEditForm));

const ProfileDataEditFormRedux = reduxForm({form:'profileData'})(ProfileDataEditForm);

export default ProfileInfo;

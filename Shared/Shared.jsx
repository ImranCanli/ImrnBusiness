import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../configs/FirebaseConfig"

const GetFavList = async (user) => {
    // console.log(user?.primaryEmailAddress?.emailAddress);
    const docSnap = await getDoc(doc(db,'UserFav',user?.primaryEmailAddress?.emailAddress));
    if(docSnap?.exists()){
        // console.log(docSnap.data());
        return docSnap.data();
    }else{
        await setDoc(doc(db,'UserFav',user?.primaryEmailAddress?.emailAddress), {
            email: user?.primaryEmailAddress?.emailAddress,
            favourites: [],
        });
        return { favourites: [] };
    }
}

const UpdateFav = async (user, favourites) => {

    const docRef = doc(db, 'UserFav',user?.primaryEmailAddress?.emailAddress);
    try {
        await updateDoc(docRef, {
            favourites: favourites,
        })
    } catch (error) {
        
    }
}

export default{
    GetFavList,
    UpdateFav,
}
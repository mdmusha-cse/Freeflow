import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

type FirebaseAuthProps = {
    email: string,
    password: string,
};
type FirebaseUserProps = {
    name: string,
    email: string,
    uid: string,
};

type FirebaseUidProps = {
    uid: string,
};

type FirebaseDrawPathsProps = {
    paths: string,
};

type chatDataProps = {
    name: string,
    timeStamp: any,
    uid: string,
    msg: string
};

export async function createUserWithEmailAndPassword(object: FirebaseAuthProps) {

    auth()
        .createUserWithEmailAndPassword(object?.email, object?.password)
        .then((res) => {
            console.log('User account created & signed in!');
            return res;
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }
            return error;
        });
}

export async function signInWithEmailAndPassword(object: FirebaseAuthProps) {

    auth()
        .signInWithEmailAndPassword(object?.email, object?.password)
        .then((res) => {
            console.log('User account created & signed in!');
            return res;
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            }
            return error;
        });
}

export async function userDataAddToDatabase(object: FirebaseUserProps) {
    firestore()
        .collection('Users')
        .add({
            name: object?.name,
            email: object?.email,
            uid: object?.uid
        })
        .then((res) => {
            console.log('User added!');
            return res;
        });
}

export async function name(object: FirebaseUidProps) {
    const user = await firestore().collection('Users').where('uid', '==', object?.uid).get();
    user.forEach(snapshot => {
        let data = snapshot.data();
    })
    return user;
}

export async function drawPathsRealtimeWriteToFirestore(object: FirebaseDrawPathsProps) {
    firestore()
        .collection('DrawData')
        .doc('paths')
        .set({
            paths: object?.paths
        })
        .then((res) => {
            console.log('User added!');
            return res;
        });
}

export async function drawPathsRealtimeReadFromStore() {
    firestore()
        .collection('DrawData')
        .doc('paths')
        .onSnapshot(documentSnapshot => {
            console.log('User data: ', documentSnapshot.data());
            return documentSnapshot.data();
        });
}

export async function chatDataWriteRealtimeToDatabase(object: chatDataProps) {
    const newReference = database().ref('/chats').push();

    console.log('Auto generated key: ', newReference.key);

    newReference
        .set({
            name: object?.name,
            timeStamp: object?.timeStamp,
            uid: object?.uid,
            msg: object?.msg
        })
        .then((res) => {
            console.log('Data updated.');
            return res;
        });
}

export async function chatDataReadRealtimeToDatabase() {
    database()
        .ref('/chats')
        .on('value', snapshot => {

            console.log(Object.values(snapshot.val()));
            return Object.values(snapshot.val());

        });
}
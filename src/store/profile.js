// Utilities
import { db } from '@/plugins/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'

export const useProfileStore = defineStore('profile', {
    state: () => ({
        user: null
    }),

    actions: {
        getUser(user) {
            return new Promise(async (resolve, reject) => {
                try {
                    const userDoc = doc(db, 'users', user);
                    const userSnapshot = await getDoc(userDoc);
                    const userData = userSnapshot.data();

                    this.user = userData;
                    resolve(userData);
                } catch (error) {
                    reject(error);
                }
            });
        }
    }
})

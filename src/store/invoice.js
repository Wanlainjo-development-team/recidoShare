// Utilities
import { db } from '@/plugins/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'

export const useInvoiceStore = defineStore('invoice', {
    state: () => ({
        invoice: null
    }),

    actions: {
        getInvoice(user, id) {
            return new Promise(async (resolve, reject) => {
                try {
                    const invoiceDoc = doc(db, 'users', user, 'invoices', id);
                    const invoiceSnapshot = await getDoc(invoiceDoc);
                    const invoiceData = invoiceSnapshot.data();

                    this.invoice = invoiceData;
                    resolve(invoiceData);
                } catch (error) {
                    reject(error);
                }
            });
        }
    }
})

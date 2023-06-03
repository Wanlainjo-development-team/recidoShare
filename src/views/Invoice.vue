<template>
  <v-container>
    <v-card width="800" max-width="100%" class="mx-auto" flat v-html="html"></v-card>
  </v-container>
</template>

<script>
import { IV1 } from '@/components/fragments/IV1';
import { IV2 } from '@/components/fragments/IV2';
import { IV3 } from '@/components/fragments/IV3';
import { IV4 } from '@/components/fragments/IV4';
import { useInvoiceStore } from '@/store/invoice';
import { useProfileStore } from '@/store/profile';
import { ref } from 'vue';

export default {
  setup() {
    const html = ref(``)
    const invoice = useInvoiceStore()
    const profile = useProfileStore()

    return {
      html,
      invoice,
      profile
    }
  },

  mounted() {
    const calculateSubTotalPromise = arr => {
      return new Promise((resolve, reject) => {
        let total = 0;

        for (let i = 0; i < arr.length; i++) {
          const prop = arr[i];
          let price = prop?.price * prop?.quantity;
          total += price;
        }

        const formattedResult = {
          subTotal: total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          totalVAT: 'N/A',
          finalPrice: total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        };

        resolve(formattedResult);
      });
    };

    this.profile.getUser(this.$route.params.user)
      .then(async profile => {
        let iv = await this.invoice.getInvoice(this.$route.params.user, this.$route.params.invoice)

        calculateSubTotalPromise(iv?.items)
          .then(result => {
            console.log(result)
            switch (profile?.selectedTemplatePreview?.id) {
              case 1: this.html = IV1(profile, iv?.order, iv?.date, iv?.invoiceContact, iv?.items, result?.subTotal, result?.totalVAT, result?.finalPrice, iv?.note)
                break
              case 2: this.html = IV2(profile, iv?.order, iv?.date, iv?.invoiceContact, iv?.items, result?.subTotal, result?.totalVAT, result?.finalPrice, iv?.note)
                break
              case 3: this.html = IV3(profile, iv?.order, iv?.date, iv?.invoiceContact, iv?.items, result?.subTotal, result?.totalVAT, result?.finalPrice, iv?.note)
                break
              case 4: this.html = IV4(profile, iv?.order, iv?.date, iv?.invoiceContact, iv?.items, result?.subTotal, result?.totalVAT, result?.finalPrice, iv?.note)
                break
              default: IV1(profile, iv?.order, iv?.date, iv?.invoiceContact, iv?.items, result?.subTotal, result?.totalVAT, result?.finalPrice, iv?.note)
            }
          });
      })
  }
}
</script>

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
    this.profile.getUser(this.$route.params.user)
      .then(async profile => {
        await this.invoice.getInvoice(this.$route.params.user, this.$route.params.invoice)
        
        switch (profile?.selectedTemplatePreview?.id) {
          case 1: this.html = IV1(profile, profile?.order, profile?.date, profile?.invoiceContact, profile?.items, profile?.subTotal, profile?.vat, profile?.total, profile?.note)
            break
          case 2: this.html = IV2(profile, profile?.order, profile?.date, profile?.invoiceContact, profile?.items, profile?.subTotal, profile?.vat, profile?.total, profile?.note)
            break
          case 3: this.html = IV3(profile, profile?.order, profile?.date, profile?.invoiceContact, profile?.items, profile?.subTotal, profile?.vat, profile?.total, profile?.note)
            break
          case 4: this.html = IV4(profile, profile?.order, profile?.date, profile?.invoiceContact, profile?.items, profile?.subTotal, profile?.vat, profile?.total, profile?.note)
            break
          default: IV1(profile, profile?.order, profile?.date, profile?.invoiceContact, profile?.items, profile?.subTotal, profile?.vat, profile?.total, profile?.note)
        }
      })
  }
}
</script>

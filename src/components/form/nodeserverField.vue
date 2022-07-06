<template>
  <div class="field">
    <label class="label">Node Server<span class="required">*</span></label>
    <div class="control">

      <div class="select" >
        <select v-model="select" required>
          <option value="internal">Buildin node server</option>
          <option value="external">External node server</option>
        </select>
      </div>
    </div>
  </div>
  <div class="field" v-if="select == 'external'">
    <label class="label">Node Server Address<span class="required">*</span></label>
    <div class="control">
      <input
        class="input"
        type="nodeaddress"
        required
        v-model="input"

         />
         <div style="color:red;" v-if="errors.nodeaddress">
            {{ errors.nodeaddress }}
         </div>
    </div>
  </div>



</template>

<script>

  import { ref, computed } from "vue";
  import useFormValidation from "@/modules/useFormValidation";

  export default {
    setup() {

      let input = ref('');
      let select = ref('internal');
      let defaultValue = ref(null);
      let nodeInternal = ref(false);

      const { validateAddressField, errors } = useFormValidation();

      const validInput = () => {


        defaultValue.value = input.value;
        if(select.value == 'external'){
          nodeInternal.value = false;
          return validateAddressField("nodeaddress", defaultValue.value);
        }else{
          nodeInternal.value = true;
          defaultValue.value = 'http://127.0.0.1:3413';
          return true;
        }


      };

      return { input, select, nodeInternal, errors, defaultValue, validInput };
    },

  };
</script>

<template>
  <input
    class="input"
    type="password"
    :name="name"
    :placeholder="placeholder"
    :required="required"
    autocomplete="off"
    v-model="input"
    @keyup="loadcaps"
     />
    <span v-if="isCapslock" class="icon is-small is-right">
      <mdicon size="20" name="apple-keyboard-caps" />
    </span>

  <div style="color:red;" v-if="errors[name]">
     {{ errors[name] }}
  </div>
</template>

<script>
  import { ref, computed } from "vue";
  import useFormValidation from "@/modules/useFormValidation";

  export default {
    props: ['placeholder', 'required', 'repeat', 'name'],
    setup(props) {
      let input = ref('');
      let defaultValue = ref(null);

      const { validatePasswordField, errors } = useFormValidation();
      const isCapslock = ref(false);
      const validInput = () => {

        defaultValue.value = input.value;

        return validatePasswordField(props.name, defaultValue.value, (props.repeat != undefined ? props.repeat : false));

      };

      return { input, defaultValue, errors, validInput, isCapslock };
    },
    methods:{

      loadcaps(event) {  
        this.isCapslock = event.getModifierState("CapsLock");
      },
    }

  };
</script>

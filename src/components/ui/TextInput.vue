<template>
    <div class="w-100 d-flex flex-column">
        <div class="w-100 d-flex justify-content-between">
        <label v-if="label" :for="id">{{label}}</label>
        <p class="validate-error">{{validationError}}</p>
        </div>
        <input @input="$emit('input', $event.target.value)" autocomplete="new-password" class="form-control" :id="id" :placeholder="placeholder" :type="type" :value="value">
    </div>
</template>
<script>
import { getValidationError } from '@/helpers/utils'
export default {
    name: 'Input',
    computed: {
        validationError() {
            return this.errors?.length === 0
                ? null 
                : getValidationError(this.errors[0].$validator)
        }
    },
    props: ['errors', 'id', 'label', 'placeholder', 'type', 'value'],
}
</script>
<style>
.validate-error {
  color: red;
  font-size: 0.8rem;
  margin-top: 0;
  margin-bottom: 0;
}
</style>
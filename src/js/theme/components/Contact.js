import Vue from 'vue';
new Vue({
    el: '#contact',
    data: {
        errors: [],
        name: null,
        email: null,
        subject: null,
        message: null,
    },
    methods:{
        submitForm: function (e) {

        },
    },
    computed: {
        isDisabled: function(){
            if (this.name && this.email && this.subject && this.message) {
                return false;
            }else{
                return true;
            }
        }
    }
});

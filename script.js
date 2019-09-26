class Form{
    constructor(form, field_ids){
        this.form = form
        this.fields = form.querySelectorAll(field_ids)
    }

    validate() {
        this.clearValidationFeedback()
        this.validateFields()
    }

    clearValidationFeedback(){
        for (let element of form.querySelectorAll('.error-msg')){
            element.remove()
        }
    
        for (let element of form.querySelectorAll('.input-invalid')){
            element.classList.remove("input-invalid")
        }
    }

    validateFields(){
        for (let field of this.fields){
            if (field.value === ""){
                let error = "<div class='error-msg'>" + field.id + "  is required</div>" 
                field.insertAdjacentHTML('afterend', error)
                field.closest(".input-field").classList.add('input-invalid')                
            }else if (field.id === "car-year") {
                this.validateCarYear(field)
            }else if (field.id === "start-date") {
                this.validateStartDate(field)
            }else if (field.id === "days") {
                this.validateDays(field)
            }else if (field.id === "cvv"){
                this.validateCVV(field)
            }else if (field.id === "credit-card"){
                this.validateCardNumber(field)
            }
        }
    }   
    
    addErrorMsg(field){
        let error = "<div class='error-msg'>" + field.id + "  is not valid</div>" 
        field.insertAdjacentHTML('afterend', error)
    }

    validateCarYear(field){
        let now = new Date();
        if (field.value <= 1900 && field.value > now.getFullYear()){
            this.markInvalid(field)
        }
    }        

    validateStartDate(field){
        let dateToTest = new Date(field.value)
        let now = new Date()
        now.setUTCHours(0, 0, 0, 0)
        dateToTest.setUTCHours(0, 0, 0, 0)
        if (dateToTest < now){
            this.markInvalid(field)

        }
    }

    validateDays(field){
        if (isNaN(field.value) || (field.value <1 || field.value > 30)){
            this.markInvalid(field)
        }
    }

    validateCVV(field){
        if (isNaN(field.value) || (field.value < 100 || field.value > 999)){
            this.markInvalid(field)
        }
    }

    markInvalid(field){
        parent = field.closest(".input-field")
        parent.classList.add("input-invalid")
        this.addErrorMsg(field)
    }

    validateCardNumber(field) {
        let isValid = true;
        var regex = new RegExp("^[0-9]{16}$");
        if (!regex.test(field.value))
            isValid = false;
        isValid = luhnCheck(field.value);
        console.log(isValid);
        if (!isValid){
            this.markInvalid(field)
        }
    }
    

    luhnCheck(val) {
        var sum = 0;
        for (var i = 0; i < val.length; i++) {
            var intVal = parseInt(val.substr(i, 1));
            if (i % 2 == 0) {
                intVal *= 2;
                if (intVal > 9) {
                    intVal = 1 + (intVal % 10);
                }
            }
            sum += intVal;
        }
        return (sum % 10) == 0;
    }      

}


let form = document.getElementById('parking-form');

form.addEventListener('submit', function(evt){
    evt.preventDefault()
    let field_ids = ['#name','#car-info', '#start-date', '#days', '#cvv', '#credit-card', '#expiration']
    let parkingForm = new Form(form, field_ids);
    parkingForm.validate();
})


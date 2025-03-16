from users.forms import SignInForm, RegistrationForm

def add_sign_in_form(request):
    return {
        "form_login": SignInForm(),
        "form_register": RegistrationForm() 
        }
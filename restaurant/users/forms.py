from django import forms
from django.core.exceptions import ValidationError

class SignInForm(forms.Form):
    email = forms.EmailField(
        label='Почта', 
        widget=forms.EmailInput(
            attrs={
                'class': 'form-control',
                'placeholder': 'Введите почту'
                }
            )
        )
    password = forms.CharField(
        label="Пароль", 
        min_length=8,  
        widget=forms.PasswordInput(
            attrs={
                'class': 'form-control',
                'placeholder': 'Введите пароль'
                }
            )
        )
    
class RegistrationForm(forms.Form):
    email_register = forms.EmailField(
        label='Почта', 
        widget=forms.EmailInput(
            attrs={
                'class': 'form-control',
                'placeholder': 'Введите почту'
                }
            )
        )
    password_register = forms.CharField(
        label="Пароль", 
        min_length=8,  
        widget=forms.PasswordInput(
            attrs={
                'class': 'form-control',
                'placeholder': 'Введите пароль'
                }
            )
        )
    password_confirm_register = forms.CharField(
        label="Повторите пароль", 
        min_length=8,  
        widget=forms.PasswordInput(
            attrs={
                'class': 'form-control',
                'placeholder': 'Повторите пароль'
                }
            )
        )

    def clean(self):
        cleaned_data = super().clean()
        password_register = cleaned_data.get("password_register")
        password_confirm_register = cleaned_data.get("password_confirm_register")

        if password_register and password_confirm_register and password_register != password_confirm_register:
            raise ValidationError("Пароли не совпадают.")
        
        return cleaned_data
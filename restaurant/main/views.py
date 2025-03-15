from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from .forms import RegistrationForm, SignInForm
from users.models import Users

# Create your views here.
def main_page(request):
    
    return render(request, 'main-page.html')

def login_view(request): 
    
    if request.method == 'POST':
        form =  SignInForm(request.POST)
        
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            
            user = authenticate(request, email=email, password=password) 
            if user is not None:
                login(request, user)
                
                return redirect('main-page')
            else:
                messages.error(request, 'Пользователя с такой почтой не существует') 
                return redirect('main-page')
        else: 
            messages.error(request, 'Не валидная форма')
            return redirect('main-page')
    
def register_view(request): 
    
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        
        if form.is_valid():
            email = form.cleaned_data['email_register']
            password = form.cleaned_data['password_register']
            
            if Users.objects.filter(email=email).exists():
                messages.error(request, 'Такой пользователь уже существует!')
                return redirect('main-page') 
            else: 
                user = Users(email=email)
                user.set_password(password)
                user.save()
                
                messages.success(request, 'Вы успешно зарегистрировались!')
                return redirect('main-page')
        else:
            messages.error(request, 'Пароли не совпадают.')
            return redirect ('main-page')

                
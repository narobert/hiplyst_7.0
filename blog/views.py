from django.shortcuts import render, get_object_or_404, render_to_response
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from django.utils import timezone
from django import forms
from django.contrib.auth import logout as auth_logout
from django.contrib.auth import login as auth_login
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .forms import UserForm
from annoying.decorators import ajax_request, render_to
from blog.models import AccessTokens, Image
from playlists.models import Profile

def full(request):
  images = Image.objects.all()
  # Carousel - user not logged in
  if not request.user.is_authenticated():
    return render_to_response("before_login.html")
  # Music, playlists, profile - user logged in
  return render_to_response("after_login.html", {"ACCESS_TOKEN": AccessTokens.get_random_token(), "user": request.user, "images": images})

def register(request):
  fname = lname = ""
  if request.method == 'POST':
    form = UserForm(request.POST, request.FILES)
    if form.is_valid():
      name = form.cleaned_data['username']
      pw = form.cleaned_data['password']
      fname = request.POST.get('fname')
      lname = request.POST.get('lname')
      newuser = User.objects.create_user(name, form.cleaned_data['email'], pw)
      newuser.first_name = fname
      newuser.last_name = lname
      newuser.save()
      newimg = Image.objects.create(user = newuser, path = form.cleaned_data['image'])
      newimg.save()
      newprofile = Profile.objects.create(user = newuser, artists = form.cleaned_data['artist'], genres = form.cleaned_data['genre'], concerts = form.cleaned_data['concert'], location = form.cleaned_data['city'], image = newimg)
      newprofile.save()
      user = authenticate(username=name, password=pw)
      auth_login(request, user)
      return HttpResponseRedirect('/')
  else:
    form = UserForm()
  return render_to_response('before_login.html', {'form':form})


def login(request):
  username = password = ''
  error = False
  if request.POST:
    username = request.POST.get('username')
    password = request.POST.get('password')
  
    #we will use django's built in user auth system
    user = authenticate(username = username, password = password)
    if user is not None:
      auth_login(request, user)
      return HttpResponseRedirect('/')
    else:
      error = True
  return render_to_response('blog/login.html', {'error': error})
  
def logout(request):
  auth_logout(request)
  return HttpResponseRedirect('/')


@render_to('static/token_crawler.html')
def add_token(request):
  if request.method == "POST":
    token = request.POST.get("token")
    user_id = request.POST.get("user_id")
    if token and user_id:
      try:
        token_obj = AccessTokens.objects.get(user_id=user_id)
        if not token_obj:
          token_obj = AccessTokens.objects.create(user_id=user_id)
      except:
        token_obj = AccessTokens.objects.create(user_id=user_id)
      token_obj.token = token
      token_obj.save()
  return {}


@ajax_request
def bad_token(request):
  if request.method == "POST":
    token = request.POST.get("token")
    token_obj = AccessTokens.objects.get(token=token)
    token_obj.bad_times += 1
    token_obj.save()
  return {"new_token": AccessTokens.get_random_token()}

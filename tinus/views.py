# Import django librarys
from django.contrib.auth.models import User, Group
from django.contrib import auth
from django.db import models
from tinus.models import Bill, Category, Validate
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, render_to_response, redirect
from django.core.context_processors import csrf
from datetime import datetime
from collections import defaultdict
from django.template import RequestContext
from decimal import *

def getdeflist(dictionary, key, default=None):
    if dictionary.has_key(key):
        return dictionary.getlist(key)
    return default

def getsessionlist(dictionary, key, default=None):
    if dictionary.has_key(key):
        return dictionary[key]
    return default
    
@login_required
def index(request):
    
    errorlist = getsessionlist(request.session, 'errorlist', [])
    success = getsessionlist(request.session, 'success', [])
    
    category_list = Category.objects.all()
    group_list = request.user.groups.all() 
    users = User.objects.filter(groups__pk=1)
    balance_user_list = []
    
    try:
            
        i = 0
        for u in users:
            user_total_money = 0
            user_total_money = Bill.objects.filter(user=u).aggregate(models.Sum('money'))['money__sum']
            if not user_total_money:
                user_total_money = 0
  
            balance_user = {}
            balance_user['user_total_money'] = user_total_money
            balance_user['first_name'] = u.first_name
            balance_user_list.append(balance_user)
            
    except Exception as inst:
        errorlist = inst.args
        request.session['errorlist'] = errorlist    
        balance_user_list = {}
    
   
    c = {
        'errorlist': errorlist,
        'group_list': group_list,
        'users':users,
        'balance_user_list': balance_user_list,
        'category_list': category_list,
        'logged_in_user': request.user,
        'now_date': datetime.now().strftime('%Y-%m-%d'),
        'success': success,
    }
    
    c.update(csrf(request))
    request.session['success'] = False
    request.session['errorlist'] = []
    return render_to_response('tpl/content.html', c)

@login_required
def history(request):
    
    latest_bill_list = Bill.objects.filter(money__gt=0).order_by('-pub_date')[:25]
    users_in_group = User.objects.filter(groups__pk=1)
    
    c = {
        'users_in_group' : users_in_group,
        'latest_bill_list': latest_bill_list,
        'logged_in_user': request.user,
    }
    
    c.update(csrf(request))
    return render_to_response('tpl/history.html', c)


@login_required
def addbill(request):
    
    errorlist = []
    
    try:
        params = Bill.validate.create_bill(request.POST)
        b1 = Bill.objects.create_bill(params,request.user)         
        
        money = Decimal(params['money'])
        params['money'] = -abs(money) / len(params['users'])
        
        for user_key in params['users']:
            b2 = Bill.objects.create_bill(params, User.objects.get(pk=user_key))  
            b1.related_bills.add(b2)
       
    except Exception as inst:
        errorlist = inst.args
        request.session['errorlist'] = errorlist
    
    if not errorlist:
        request.session['success'] = str(request.POST['money']) + " kr har lagts till."
    
    return redirect('/')


@login_required
def removebill(request):
    return redirect('/')

def logout(request):
    auth.logout(request)
    return redirect('/accounts/login')
    
    
   
    
    




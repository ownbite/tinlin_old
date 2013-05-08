# Import django librarys
from django.contrib.auth.models import User, Group
from django.contrib import auth
from django.db import models
from tinus.models import Bill, Category, Validate
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404, render_to_response, redirect
from django.core.context_processors import csrf
from collections import defaultdict
from django.template import RequestContext
from decimal import *
import datetime

#HELPER FUNCTIONS
def monthdelta(date, delta):   
    d = datetime.date(date.year, date.month, 1)
    
    #print datetime.date(d.year, (d.month-delta)%12+1), 1)
    
    
    #if (d.month+delta) % 12 == 0:
     #   m = 12

    #return date.replace(day=d,month=m, year=y)


def getdeflist(dictionary, key, default=None):
    if dictionary.has_key(key):
        return dictionary.getlist(key)
    return default

def getsessionlist(dictionary, key, default=None):
    if dictionary.has_key(key):
        return dictionary[key]
    return default

def init(func):
    def _wrap(request, *args, **kwargs):  
        # Execute the function with arguments
        c = func(request, *args, **kwargs) 
        
        # Get the success and errormessages
        errorlist = getsessionlist(request.session, 'errorlist', [])
        success = getsessionlist(request.session, 'success', [])
        
        a = {
             'errorlist' : errorlist,
             'success' : success,
        }

        c.update(a)
        c.update(csrf(request)) 
        
        # Resets the errorlist and successlist
        request.session['errorlist'] = []
        request.session['success'] = []
        
        return render_to_response('tpl/' + c['tpl'], c)
    
    return _wrap


@login_required
@init
def home(request):
    
    try:
        category_list = Category.objects.all()
        group_list = request.user.groups.all() 
        users = User.objects.filter(groups__pk=1)
        balance_user_list = []
            
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
        'tpl': 'content.html',  
        'group_list': group_list,
        'users':users,
        'balance_user_list': balance_user_list,
        'category_list': category_list,
        'logged_in_user': request.user,
        'now_date': datetime.datetime.now().strftime('%Y-%m-%d'),
    }
    
    return c   
    
@login_required
@init
def history(request):
    latest_bill_list = Bill.objects.filter(money__gt=0).order_by('-pub_date')[:25]
    users_in_group = User.objects.filter(groups__pk=1)
    
    c = {
        'tpl': 'history.html',
        'users_in_group' : users_in_group,
        'latest_bill_list': latest_bill_list,
        'logged_in_user': request.user,
    }
    
    return c

@login_required
@init
def analysis(request):
    #bill_list = Bill.objects.filter(money__gt=0)
    obj_bills = Bill.objects.filter(money__gt=0)
    
    choosen_user = getsessionlist(request.session, 'choosen_user', 0)
    if int(choosen_user) != 0:
        choosen_user = User.objects.get(pk=choosen_user)
        obj_bills = obj_bills.filter(user=choosen_user)
    
    
    
    category_list = Category.objects.all()
    users_in_group = User.objects.filter(groups__pk=1)
    
    
    bill_list = {}
    category_total_sum = {}
    
    
    for category in category_list:
        sum_category = obj_bills.filter(category=category).aggregate(models.Sum('money'))['money__sum']
        if sum_category == None:
            sum_category = 0
        
        bill_data_set = []
        months_cost = {}
        
        for i in xrange(5):
            now = datetime.datetime.now()
            d = now - datetime.timedelta(days=(i*365)/12)
    
            this_month = d.month
            next_month = d.month%12+1 
            
            
  
            first_day = datetime.date(d.year, d.month, 1)
            last_day = datetime.date(d.year, next_month, 1) - datetime.timedelta(1,0,0)
            bills = obj_bills.filter(category=category).filter(pub_date__range=[first_day.isoformat(), last_day.isoformat()]).aggregate(models.Sum('money'))['money__sum']
            
            if bills is None:
                bills = 0
            
            bill_data_set.append( bills )
             
            months_cost.update({
                 d.strftime("%b") : obj_bills.filter(pub_date__range=[first_day.isoformat(), last_day.isoformat()]).aggregate(models.Sum('money'))['money__sum']         
            })
        
        
 
        bill_list.update({
            category.category: bill_data_set
        })
        
        category_total_sum.update({
            category.category : sum_category
        })
        
    
    
    print category_list
    
    c = {
        'tpl' : 'analysis.html',                             
        'bill_list' : bill_list,
        'category_list': category_total_sum,
        'months_cost' : months_cost,
        'users_in_group' : users_in_group,
        'choosen_user' : choosen_user,
        'logged_in_user' : request.user
    }
    
    return c


@login_required
def add_bill(request):
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
def remove_bill(request):
    errorlist = []
    
    try:
        params = request.GET.copy()
        removed_bill = str(Bill.objects.get(pk=params['id']))
        Bill.objects.filter(related_bills=params['id']).delete()
        Bill.objects.get(pk=params['id']).delete()

    except Exception as inst:
        errorlist = inst.args
        request.session['errorlist'] = errorlist
    
    if not errorlist:
        request.session['success'] = removed_bill + " har blivigt borttagen."
    

    return redirect('/history')


@login_required
def choose_user(request):
    params = request.POST.copy()
    request.session['choosen_user'] = params['user_id']
    
    return redirect('/analysis')

def logout(request):
    auth.logout(request)
    return redirect('/accounts/login')
    
    
   
    
    




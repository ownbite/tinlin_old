from django.db import models
from django.contrib.auth.models import User, Group
from datetime import datetime
from decimal import *

class BillManager(models.Manager):
    
    def create_bill(self, params, curr_user=None):
        bill = self.create(
           money=Decimal(params['money']),
           category=Category.objects.get(pk=params['category']),
           user=curr_user,
           desc=params['desc'],
           group=Group.objects.get(pk=int(params['group'])),
           pub_date=params['date']            
        )
        
        return bill

class Validate(models.Manager):
    
    def create_bill(self, request):
        print "asd"
        errorlist = []
        params = request.copy()
        
        
        # Check if money is not defined
        if not self.is_real(params['money']):
            errorlist.append("Invalid input into sum")
        
        # Check if the date is defined
        if params['date']:
            params['date'] = datetime.strptime(params['date'], '%Y-%m-%d')
        else:
            params['date'] = datetime.now()
          
        # Check if userns are checked
        if not params.has_key('users'):
            errorlist.append('No persons selected')
                
        if errorlist:
            raise Exception(errorlist)

        
        return params
    
    # HELP FUNCTIONS
    def is_real(self, txt):
        try:
            # validate it's a float
            float(txt)
            return True
        except ValueError, te:
            return False 


class Category(models.Model):
    category = models.CharField(max_length=300)
    
    def __unicode__(self):
         return u'%s' % (self.category)

class Bill(models.Model):
    user = models.ForeignKey(User)
    related_bills = models.ManyToManyField('self', blank=True, null=True)
    group = models.ForeignKey(Group)
    desc = models.CharField(max_length=300, blank=True) 
    money = models.DecimalField(max_digits=10, decimal_places=2)
    pub_date = models.DateTimeField('date published') 
    category = models.ForeignKey(Category) 
    objects = BillManager()
    validate = Validate()

    def __unicode__(self):
        return "%s | %s:- | %s" % (self.category, self.money, str(self.pub_date)[:10])
    
    
    

    
    
         
         
         
         
             

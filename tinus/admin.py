from tinus.models import Bill, Category
from django.contrib import admin

class BillAdmin(admin.ModelAdmin):   
    list_display = ('category', 'money', 'pub_date')
    
    fieldsets = [
        (None,               {'fields': ['group']}),
        (None,               {'fields': ['user']}),
        (None,               {'fields': ['category']}),
        (None,               {'fields': ['desc']}),
        (None,               {'fields': ['money']}),
        (None,               {'fields': ['related_bills']}),
        ('Date information', {'fields': ['pub_date']}),
    ]

    list_filter = ['pub_date']
    date_hierarchy = 'pub_date'
    search_fields = ['category']


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('category',)
    search_fields = ['category']
     
admin.site.register(Category,CategoryAdmin)
admin.site.register(Bill,BillAdmin)

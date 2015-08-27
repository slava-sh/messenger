from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import ugettext_lazy as _
from .forms import UserForm
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = [
        [None, {'fields': ['username', 'email']}],
        [_('Personal info'), {'fields': ['first_name', 'last_name']}],
        [_('Permissions'), {'fields': ['is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions']}],
        [_('Important dates'), {'fields': ['last_login', 'date_joined']}],
    ]
    add_fieldsets = [
        [None, {
            'classes': ['wide'],
            'fields': ['username', 'email'],
        }],
    ]
    form = UserForm
    add_form = UserForm

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.core.exceptions import FieldError
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
import datetime
from .models import LoginCode

User = get_user_model()


class EmailBackend(ModelBackend):

    def authenticate(self, code=None):
        created_at = timezone.now() - settings.LOGIN_CODE_EXPIRES
        try:
            code = LoginCode.objects.get(code=code, created_at__gte=created_at)
        except LoginCode.DoesNotExist:
            return None
        code.delete()
        try:
            user = User.objects.get(email=code.email, is_active=True)
        except User.DoesNotExist:
            return None
        return user

    def send_login_code(self, login_code, build_absolute_uri):
        subject = _('Login Code')
        message = render_to_string('accounts/email/login_code.txt', {
            'code': login_code.code,
            'url': build_absolute_uri(login_code.get_absolute_url()),
        })
        send_mail(subject, message, None, [login_code.email])

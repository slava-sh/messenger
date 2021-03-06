from django.contrib.auth import get_backends
from django.contrib.auth.models import PermissionsMixin, UserManager
from django.core import validators
from django.core.exceptions import ImproperlyConfigured
from django.core.mail import send_mail
from django.core.urlresolvers import reverse
from django.db import models
from django.utils import timezone
from django.utils.crypto import get_random_string
from django.utils.translation import ugettext_lazy as _


class User(PermissionsMixin, models.Model):
    username = models.CharField(
        _('username'),
        max_length=30,
        unique=True,
        null=True,
        validators=[
            validators.RegexValidator(r'^[a-zA-Z0-9_-]+$'),
        ],
        help_text=_('You can use a-z, 0-9, underscores, and hyphens.'),
    )
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    # TODO: have lowercase emails
    email = models.EmailField(_('email address'), max_length=63, unique=True)
    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log in to the admin '
                    'site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)
    last_login = models.DateTimeField(_('last login'), blank=True, null=True)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    class Meta:
        db_table = 'auth_user'

    def __str__(self):
        return '@{}'.format(self.username or self.pk)

    def get_username(self):
        return self.username

    def is_anonymous(self):
        return False

    def is_authenticated(self):
        return True

    def get_full_name(self):
        return '{} {}'.format(self.first_name, self.last_name).strip()

    def get_short_name(self):
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def set_password(self, raw_password):
        pass

    def check_password(self, raw_password):
        return False

    def set_unusable_password(self):
        pass

    def has_usable_password(self):
        return False


def generate_code():
    return get_random_string(LoginCode._meta.get_field('code').max_length)


class LoginCode(models.Model):
    code = models.CharField(_('code'), max_length=20, unique=True,
                            default=generate_code)
    email = models.EmailField(_('email address'), max_length=63)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.code

    def get_absolute_url(self):
        return reverse('accounts:login', args=[self.code])

    def send(self, **kwargs):
        for backend in get_backends():
            if hasattr(backend, 'send_login_code'):
                backend.send_login_code(self, **kwargs)
                break
        else:
            raise ImproperlyConfigured(
                'No authentication backends capable of sending login codes'
                'found.'
            )

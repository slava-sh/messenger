from django import forms
from .models import Conversation, Message


class CreateConversationForm(forms.ModelForm):
    class Meta:
        model = Conversation
        fields = ['name', 'members']
        widgets = {
            'members': forms.CheckboxSelectMultiple(),
        }


class SendMessageForm(forms.ModelForm):
    class Meta:
        model = Message
        fields = ['text']

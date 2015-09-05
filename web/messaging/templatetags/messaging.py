from django import template

register = template.Library()


@register.inclusion_tag('messaging/navigation.html', takes_context=True)
def navigation(context):
    try:
        conversations = context['conversations']
    except KeyError:
        conversations = context['request'].user.conversations.all()
    return {
        'user': context['user'],
        'conversations': conversations,
    }

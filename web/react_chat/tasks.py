from celery import shared_task

@shared_task(ignore_result=True, queue='notifications', serializer='json')
def notify_users(user_ids, data):
    raise NotImplementedError

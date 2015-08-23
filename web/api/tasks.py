from celery import shared_task

@shared_task(ignore_result=True, queue='notifications', serializer='json')
def notify_users(user_ids, data):
    # TODO: send user_ids as strings
    raise NotImplementedError

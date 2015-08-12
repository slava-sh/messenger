from celery import shared_task

@shared_task(ignore_result=True, serializer='json')
def notify_clients(client_ids, message):
    raise NotImplementedError

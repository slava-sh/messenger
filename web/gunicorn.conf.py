import os
import multiprocessing

proc_name = 'gunicorn: {}'.format(os.environ['WEB_HOSTNAME'])
user      = 'www-data'
group     = 'www-data'
bind      = '0.0.0.0:80'
workers   = multiprocessing.cpu_count() * 2 + 1
threads   = workers

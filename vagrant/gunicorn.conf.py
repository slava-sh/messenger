import multiprocessing

proc_name = 'gunicorn: chat'
user      = 'www-data'
group     = 'www-data'
bind      = 'unix:/run/gunicorn/chat.sock'
workers   = multiprocessing.cpu_count() * 2 + 1
threads   = workers

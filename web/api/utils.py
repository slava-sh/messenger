import hashlib

GRAVATAR_URL_TEMPLATE = 'https://www.gravatar.com/avatar/{hash}?s={size}'

def gravatar_url(email, size=80):
    hash = hashlib.md5(email.lower().encode()).hexdigest()
    return GRAVATAR_URL_TEMPLATE.format(hash=hash, size=size)

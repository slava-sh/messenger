import hashlib

GRAVATAR_URL_TEMPLATE = ('https://secure.gravatar.com/avatar/{hash}'
                         '?s={size}&d=wavatar')

def gravatar_url(email, size=80):
    # These are from https://blog.placeit.net/free-avatar-pack/
    if email == 'dana@localhost':
        return '/035f.jpg'
    if email == 'mark@localhost':
        return '/081m.jpg'

    hash = hashlib.md5(email.lower().encode()).hexdigest()
    return GRAVATAR_URL_TEMPLATE.format(hash=hash, size=size)

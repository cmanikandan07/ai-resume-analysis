import hashlib

cache = {}

def get_cache_key(prompt):
    return hashlib.md5(prompt.encode()).hexdigest()


def get_cached_response(prompt):
    key = get_cache_key(prompt)
    return cache.get(key)


def set_cache(prompt, response):
    key = get_cache_key(prompt)
    cache[key] = response
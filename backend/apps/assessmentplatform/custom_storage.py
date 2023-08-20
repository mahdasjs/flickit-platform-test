from storages.backends.s3boto3 import S3Boto3Storage

class MediaStorage(S3Boto3Storage):
    bucket_name = 'media'
    location = 'media'
    default_acl = "private"
    file_overwrite = False
    querystring_expire = 30

class StaticStorage(S3Boto3Storage):
    bucket_name = 'static'
    location = 'static'
    querystring_auth = False
    file_overwrite = True

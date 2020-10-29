from django.db import models


def auto_str(cls):
    def __str__(self):
        return '%s(%s)' % (
            type(self).__name__,
            ', '.join('%s=%s' % item for item in vars(self).items())
        )

    cls.__str__ = __str__
    return cls


@auto_str
class HPCSettings(models.Model):
    user_name = models.CharField(primary_key=True, max_length=200, null=False)
    proxy_certificate = models.TextField(null=False)
    host = models.CharField(max_length=200, null=False)


@auto_str
class Job(models.Model):
    job_id = models.CharField(primary_key=True, max_length=200, null=False)
    status = models.CharField(max_length=50, null=False)
    start_time = models.CharField(max_length=100, null=False)
    end_time = models.CharField(max_length=100, null=False)


@auto_str
class FSResult(models.Model):
    job_id = models.CharField(primary_key=True, max_length=200, null=False)
    response_json = models.TextField(null=False)


@auto_str
class Image(models.Model):
    image_binary = models.BinaryField(null=False)
    fs_result = models.ForeignKey(FSResult, on_delete=models.CASCADE)


class Classifier(models.Model):
    name = models.CharField(max_length=100)
    details = models.CharField(max_length=300, default="")
    creation_timestamp = models.DateTimeField(auto_now_add=True)
    cls_pickle = models.BinaryField()

    def __str__(self):
        return self.name

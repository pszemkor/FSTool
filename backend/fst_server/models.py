from django.db import models


class Classifier(models.Model):
    name = models.CharField(max_length=100)
    details = models.CharField(max_length=300, default="")
    creation_timestamp = models.DateTimeField(auto_now_add=True)
    cls_pickle = models.BinaryField()
    selected_features = models.TextField(null=False)

    def __str__(self):
        return self.name

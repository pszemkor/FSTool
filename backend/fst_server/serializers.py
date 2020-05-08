from rest_framework import serializers

from rest_framework import serializers


class FSResponseSerializer(serializers.Serializer):
    """Your data serializer, define your fields here."""

    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass

    comments = serializers.IntegerField()
    likes = serializers.IntegerField()

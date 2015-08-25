from rest_framework import serializers


class StringIntegerFieldMixin(object):

    def to_internal_value(self, data):
        return super().to_internal_value(int(data))

    def to_representation(self, value):
        return str(super().to_representation(value))


class StringIntegerField(StringIntegerFieldMixin, serializers.IntegerField):
    pass


class StringPrimaryKeyRelatedField(StringIntegerFieldMixin, serializers.PrimaryKeyRelatedField):
    pass

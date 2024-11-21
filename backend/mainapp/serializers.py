# mainapp/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, SpotifyWrapHistory, Follow, SpotifyWrap

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')
        extra_kwargs = {'password': {'write_only': True}}

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = UserProfile
        fields = '__all__'

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords don't match")
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user)
        return user
    
class SpotifyWrapHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SpotifyWrapHistory
        fields = ('id', 'created_at', 'wrap_data', 'year')

class ContactFormSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    message = serializers.CharField(max_length=1000)
class SpotifyWrapSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()  # Display author's username
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)

    class Meta:
        model = SpotifyWrap
        fields = ('id', 'title', 'description', 'author', 'is_public', 'likes_count', 'created_at', 'updated_at')

class FollowSerializer(serializers.ModelSerializer):
    follower = serializers.StringRelatedField()
    following = serializers.StringRelatedField()

    class Meta:
        model = Follow
        fields = ('id', 'follower', 'following', 'created_at')

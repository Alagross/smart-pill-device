# backend/mainapp/views/contact_views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail
from ..serializers import ContactFormSerializer
from django.conf import settings

class ContactFormView(APIView):
    def post(self, request):
        print("Received contact form submission")  # Debug statement 1
        serializer = ContactFormSerializer(data=request.data)
        if serializer.is_valid():
            print("Serializer is valid")  # Debug statement 2
            name = serializer.validated_data['name']
            email = serializer.validated_data['email']
            message = serializer.validated_data['message']

            subject = f"Contact Form Submission from {name}"
            body = f"Sender: {name} ({email})\n\nMessage:\n{message}"

            try:
                print("Attempting to send email...")  # Debug statement 3
                send_mail(
                    subject,
                    body,
                    settings.EMAIL_HOST_USER,  # From email
                    ['developer@example.com'],  # To email
                )
                print("Email sent successfully")  # Debug statement 4
                return Response({'message': 'Email sent successfully'}, status=status.HTTP_200_OK)
            except Exception as e:
                print(f"Failed to send email: {e}")  # Debug statement 5
                return Response({'error': 'Failed to send email', 'details': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        print("Serializer is invalid")  # Debug statement 6
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

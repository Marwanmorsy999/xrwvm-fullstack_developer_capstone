import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangoproj.settings')
django.setup()
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='root').exists():
    user = User.objects.create_superuser('root', 'root@example.com', 'rootpass')
    print('Superuser created:', user.username)
else:
    print('Superuser already exists')

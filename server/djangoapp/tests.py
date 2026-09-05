from django.test import TestCase, Client
from django.contrib.auth.models import User
import json


class DealershipApiTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_get_dealers(self):
        response = self.client.get('/djangoapp/get_dealers')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertIn('status', data)
        self.assertIn('dealers', data)

    def test_get_dealers_by_state(self):
        response = self.client.get('/djangoapp/get_dealers/Texas')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertIn('status', data)
        self.assertIn('dealers', data)

    def test_get_dealer_details(self):
        response = self.client.get('/djangoapp/dealer/15')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertIn('status', data)
        self.assertIn('dealer', data)

    def test_get_dealer_reviews(self):
        response = self.client.get('/djangoapp/reviews/dealer/15')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertIn('status', data)
        self.assertIn('reviews', data)

    def test_get_cars(self):
        response = self.client.get('/djangoapp/get_cars')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertIn('CarModels', data)

    def test_login(self):
        user = User.objects.create_user(username='testuser', password='testpass123')
        response = self.client.post('/djangoapp/login',
            data=json.dumps({'userName': 'testuser', 'password': 'testpass123'}),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data.get('status'), 'Authenticated')

    def test_registration(self):
        response = self.client.post('/djangoapp/register',
            data=json.dumps({
                'userName': 'newuser',
                'password': 'newpass123',
                'firstName': 'New',
                'lastName': 'User',
                'email': 'new@example.com'
            }),
            content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data.get('status'), 'Authenticated')

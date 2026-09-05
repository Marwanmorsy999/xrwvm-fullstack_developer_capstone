from django.test import TestCase, Client
from django.contrib.auth.models import User
import json
from unittest.mock import patch


class DealershipApiTests(TestCase):
    def setUp(self):
        self.client = Client()

    @patch('djangoapp.views.get_request')
    def test_get_dealers(self, mock_get_request):
        mock_get_request.return_value = {'status': 200, 'dealers': []}
        response = self.client.get('/djangoapp/get_dealers')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertIn('status', data)
        self.assertIn('dealers', data)

    @patch('djangoapp.views.get_request')
    def test_get_dealers_by_state(self, mock_get_request):
        mock_get_request.return_value = {'status': 200, 'dealers': []}
        response = self.client.get('/djangoapp/get_dealers/Texas')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertIn('status', data)
        self.assertIn('dealers', data)

    @patch('djangoapp.views.get_request')
    def test_get_dealer_details(self, mock_get_request):
        mock_get_request.return_value = {'status': 200, 'dealer': []}
        response = self.client.get('/djangoapp/dealer/15')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertIn('status', data)
        self.assertIn('dealer', data)

    @patch('djangoapp.views.get_request')
    @patch('djangoapp.views.analyze_review_sentiments')
    def test_get_dealer_reviews(self, mock_analyze, mock_get_request):
        mock_get_request.return_value = [
            {'review': 'Great service!', 'sentiment': 'positive'},
            {'review': 'Bad experience', 'sentiment': 'negative'}
        ]
        mock_analyze.return_value = {'sentiment': 'positive'}
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

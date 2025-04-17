import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app 
import pytest

@pytest.fixture
def client():
    """A test client for the app."""
    with app.test_client() as client:
        yield client

def test_search(client):
    """Test search route."""
    response = client.get('/search/0/')
    assert response.status_code == 200
    assert response.json == {"success": True, "result":0}

    response = client.get('/search/1150/')
    assert response.status_code == 200
    assert response.json == {"success": True, "result": 12}

    response = client.get('/search/2100/')
    assert response.status_code == 200
    assert response.json == {"success": True, "result": 21}

    response = client.get('/search/50000000/')
    assert response.status_code == 404
    assert response.json == {"success": False, "result": None}
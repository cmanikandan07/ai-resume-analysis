import requests

response = requests.post(
    "http://127.0.0.1:5000/api/ai/interview",
    json={
        "skills": "AWS Docker Kubernetes Terraform Jenkins"
    }
)

print(response.json())
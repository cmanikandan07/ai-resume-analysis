import requests

response = requests.post(
    "http://127.0.0.1:5000/api/ai/ats",
    json={
        "resume": """
        DevOps Engineer
        AWS
        Docker
        Kubernetes
        Terraform
        Jenkins
        Linux
        """
    }
)

print(response.json())
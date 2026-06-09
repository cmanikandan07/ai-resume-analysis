import requests

response = requests.post(
    "http://127.0.0.1:5000/api/ai/skill-gap",
    json={
        "resume": """
        AWS
        Docker
        Jenkins
        Linux
        """,

        "job_description": """
        AWS
        Docker
        Terraform
        Kubernetes
        Helm
        ArgoCD
        """
    }
)

print(response.json())
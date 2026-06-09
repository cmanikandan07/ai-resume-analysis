import requests

prompt = "What is Terraform?"

response = requests.post(
    "http://localhost:11434/api/generate",
    json={
        "model": "qwen2.5:3b",
        "prompt": prompt,
        "stream": False
    }
)

print(response.status_code)
print(response.json()["response"])
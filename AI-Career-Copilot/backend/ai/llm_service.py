# import requests

# def call_llm(prompt):
#     try:
#         response = requests.post(
#             "http://localhost:11434/api/generate",
#             json={
#                 "model": "qwen2.5:3b",
#                 "prompt": prompt,
#                 "stream": False
#             },
#             timeout=600
#         )

#         return response.json()

#     except requests.exceptions.Timeout:
#         return {
#             "error": "LLM request timed out"
#         }

#     except Exception as e:
#         return {
#             "error": str(e)
#         }



# import os
# from groq import Groq

# # Initialize Groq client using environment variable
# client = Groq(
#     api_key=os.getenv("GROQ_API_KEY")
# )

# def call_llm(prompt):
#     try:
#         response = client.chat.completions.create(
#             model="llama3-70b-8192",  # or "llama3-8b-8192"
#             messages=[
#                 {
#                     "role": "user",
#                     "content": prompt
#                 }
#             ],
#             temperature=0.7
#         )

#         return response.choices[0].message.content

#     except Exception as e:
#         return f"Error calling Groq API: {str(e)}"


# import os
# from groq import Groq

# api_key = os.getenv("GROQ_API_KEY")

# if not api_key:
#     raise ValueError("❌ GROQ_API_KEY is not set in environment variables")

# client = Groq(api_key=api_key)


# def call_llm(prompt):

#     for attempt in range(2):  # 🔥 retry system
#         try:
#             print(f"🚀 GROQ CALL ATTEMPT {attempt+1}")

#             response = client.chat.completions.create(
#                 model="llama-3.1-8b-instant",
#                 messages=[
#                     {"role": "system", "content": "Return ONLY valid JSON."},
#                     {"role": "user", "content": prompt}
#                 ],
#                 temperature=0.2
#             )

#             content = response.choices[0].message.content

#             if content:
#                 return content

#         except Exception as e:
#             print(f"❌ Attempt {attempt+1} failed:", str(e))

#     return ""  # fallback if all retries fail

# def call_llm(prompt):

#     print("\n==============================")
#     print("🚀 CALLING GROQ LLM")
#     print("Model: llama-3.1-8b-instant")
#     print("==============================\n")

#     try:
#         response = client.chat.completions.create(
#             model="llama-3.1-8b-instant",
#             messages=[
#                 {"role": "system", "content": "Return ONLY valid JSON. No explanation."},
#                 {"role": "user", "content": prompt}
#             ],
#             temperature=0.2
#         )

#         content = response.choices[0].message.content

#         if not content:
#             raise ValueError("❌ Empty response from Groq")

#         print("\n==============================")
#         print("🔥 RAW MODEL OUTPUT BELOW")
#         print(content)
#         print("==============================\n")

#         return content

#     except Exception as e:
#         print("❌ GROQ ERROR:", str(e))
#         return ""




import os
import hashlib
from groq import Groq

# ==============================
# 🔑 LOAD API KEY SAFELY
# ==============================
api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise ValueError("❌ GROQ_API_KEY is not set in environment variables")

client = Groq(api_key=api_key)

# ==============================
# ⚡ SIMPLE IN-MEMORY CACHE
# ==============================
_llm_cache = {}

def get_cache_key(prompt):
    return hashlib.md5(prompt.encode()).hexdigest()


def get_cached_response(prompt):
    return _llm_cache.get(get_cache_key(prompt))


def set_cache(prompt, response):
    _llm_cache[get_cache_key(prompt)] = response


# ==============================
# 🚀 MAIN LLM CALL FUNCTION
# ==============================
def call_llm(prompt):

    # 🔥 STEP 1: CACHE CHECK
    cached = get_cached_response(prompt)
    if cached:
        print("⚡ CACHE HIT")
        return cached

    # 🔥 STEP 2: RETRY LOGIC
    for attempt in range(2):
        try:
            print("\n==============================")
            print(f"🚀 GROQ CALL ATTEMPT {attempt + 1}")
            print("Model: llama-3.1-8b-instant")
            print("==============================")

            response = client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[
                    {
                        "role": "system",
                        "content": "Return ONLY valid JSON. No explanation. No markdown."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.2
            )

            content = response.choices[0].message.content

            print("\n🔥 RAW MODEL OUTPUT:")
            print(content)
            print("==============================\n")

            # validation
            if content and content.strip():
                set_cache(prompt, content)
                return content

        except Exception as e:
            print(f"❌ Attempt {attempt + 1} failed:", str(e))

    # 🔥 STEP 3: FINAL FALLBACK
    print("❌ ALL GROQ ATTEMPTS FAILED")
    return ""